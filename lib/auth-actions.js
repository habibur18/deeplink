"use server";

import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Register a new user
export async function registerUser(formData) {
  try {
    await connectToDatabase();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const domain = formData.get("domain");

    // Validate inputs
    if (!name || !email || !password || !domain) {
      return { error: "All fields are required" };
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "Email already in use" };
    }

    // Check if domain already exists
    const domainExists = await User.findOne({ domains: domain });
    if (domainExists) {
      return { error: "Domain already in use" };
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      domains: [domain],
    });

    await newUser.save();

    // Create and set JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.NEXTAUTH_SECRET, { expiresIn: "7d" });

    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Failed to register. Please try again." };
  }
}

// Login user
export async function loginUser(formData) {
  try {
    await connectToDatabase();

    const email = formData.get("email");
    const password = formData.get("password");

    // Validate inputs
    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "Invalid email or password" };
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "Invalid email or password" };
    }

    // Create and set JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.NEXTAUTH_SECRET, { expiresIn: "7d" });

    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Failed to login. Please try again." };
  }
}

// Logout user
export async function logoutUser() {
  cookies().delete("auth-token");
  redirect("/login");
}

// Get current user
export async function getCurrentUser() {
  try {
    const cookiesRes = await cookies();
    const token = cookiesRes.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    await connectToDatabase();

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Add domain to user
export async function addDomain(formData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Not authenticated" };
    }

    const domain = formData.get("domain");

    if (!domain) {
      return { error: "Domain is required" };
    }

    await connectToDatabase();

    // Check if domain already exists
    const domainExists = await User.findOne({ domains: domain });
    if (domainExists) {
      return { error: "Domain already in use" };
    }

    // Add domain to user
    await User.findByIdAndUpdate(user._id, { $push: { domains: domain } });

    return { success: true };
  } catch (error) {
    console.error("Error adding domain:", error);
    return { error: "Failed to add domain. Please try again." };
  }
}

// Get user domains
export async function getUserDomains() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return [];
    }

    return user.domains || [];
  } catch (error) {
    console.error("Error getting user domains:", error);
    return [];
  }
}

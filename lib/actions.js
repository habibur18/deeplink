"use server"

import { connectToDatabase } from "@/lib/db"
import Link from "@/lib/models/link"
import { nanoid } from "nanoid"
import { getCurrentUser } from "@/lib/auth-actions"

// Create a new link
export async function createLink(originalUrl, customSlug, domain = "") {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "You must be logged in to create links" }
    }

    await connectToDatabase()

    // Generate a slug if not provided
    const slug = customSlug || nanoid(6)

    // Check if slug already exists
    if (customSlug) {
      const existingLink = await Link.findOne({ slug: customSlug })
      if (existingLink) {
        return { error: "This custom link is already taken. Please try another." }
      }
    }

    // Validate domain
    if (domain && !user.domains.includes(domain)) {
      return { error: "You don't have access to this domain" }
    }

    // Create the link
    const newLink = new Link({
      originalUrl,
      slug,
      customSlug: !!customSlug,
      clicks: 0,
      userId: user._id,
      domain,
    })

    await newLink.save()
    return { success: true, slug }
  } catch (error) {
    console.error("Error creating link:", error)
    return { error: "Failed to create link. Please try again." }
  }
}

// Get all links for current user
export async function getLinks() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return []
    }

    await connectToDatabase()
    const links = await Link.find({ userId: user._id }).sort({ createdAt: -1 })
    return JSON.parse(JSON.stringify(links))
  } catch (error) {
    console.error("Error fetching links:", error)
    return []
  }
}

// Get redirect URL and increment click count
export async function getRedirectUrl(slug, domain = "") {
  try {
    await connectToDatabase()

    const query = { slug }
    if (domain) {
      query.domain = domain
    }

    const link = await Link.findOneAndUpdate(query, { $inc: { clicks: 1 } }, { new: true })

    if (!link) {
      return { url: null }
    }

    return { url: link.originalUrl }
  } catch (error) {
    console.error("Error getting redirect URL:", error)
    return { url: null }
  }
}

// Delete a link
export async function deleteLink(id) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    await connectToDatabase()

    // Ensure the link belongs to the user
    const link = await Link.findOne({ _id: id, userId: user._id })

    if (!link) {
      throw new Error("Link not found or you don't have permission")
    }

    await Link.findByIdAndDelete(id)
    return { success: true }
  } catch (error) {
    console.error("Error deleting link:", error)
    throw new Error("Failed to delete link")
  }
}

// Get user domains
export async function getUserDomains() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return []
    }

    return user.domains || []
  } catch (error) {
    console.error("Error getting user domains:", error)
    return []
  }
}


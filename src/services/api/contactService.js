import { getApperClient } from "@/services/apperClient"
import { toast } from "react-toastify"

export const contactService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.fetchRecords('contact_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}}
        ]
      })
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching contacts:", error?.message || error)
      toast.error("Failed to load contacts")
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.getRecordById('contact_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}}
        ]
      })
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.message || error)
      toast.error("Failed to load contact")
      return null
    }
  },

  async create(contactData) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.createRecord('contact_c', {
        records: [{
          Name: contactData.name_c || contactData.Name,
          name_c: contactData.name_c,
          company_c: contactData.company_c,
          email_c: contactData.email_c,
          phone_c: contactData.phone_c,
          notes_c: contactData.notes_c || "",
          tags_c: Array.isArray(contactData.tags_c) ? contactData.tags_c.join(',') : contactData.tags_c || ""
        }]
      })
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to create contact:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        return response.results[0].data
      }
      
      return response.data
    } catch (error) {
      console.error("Error creating contact:", error?.message || error)
      toast.error("Failed to create contact")
      return null
    }
  },

  async update(id, contactData) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.updateRecord('contact_c', {
        records: [{
          Id: parseInt(id),
          Name: contactData.name_c || contactData.Name,
          name_c: contactData.name_c,
          company_c: contactData.company_c,
          email_c: contactData.email_c,
          phone_c: contactData.phone_c,
          notes_c: contactData.notes_c || "",
          tags_c: Array.isArray(contactData.tags_c) ? contactData.tags_c.join(',') : contactData.tags_c || ""
        }]
      })
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to update contact:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        return response.results[0].data
      }
      
      return response.data
    } catch (error) {
      console.error("Error updating contact:", error?.message || error)
      toast.error("Failed to update contact")
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.deleteRecord('contact_c', {
        RecordIds: [parseInt(id)]
      })
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to delete contact:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return false
        }
      }
      
      return true
    } catch (error) {
      console.error("Error deleting contact:", error?.message || error)
      toast.error("Failed to delete contact")
      return false
    }
  }
}
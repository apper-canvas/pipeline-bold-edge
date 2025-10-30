import { getApperClient } from "@/services/apperClient"
import { toast } from "react-toastify"

export const dealService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.fetchRecords('deal_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "contact_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "close_date_c"}},
          {"field": {"Name": "probability_c"}},
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
      console.error("Error fetching deals:", error?.message || error)
      toast.error("Failed to load deals")
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.getRecordById('deal_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "contact_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "close_date_c"}},
          {"field": {"Name": "probability_c"}},
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
      console.error(`Error fetching deal ${id}:`, error?.message || error)
      toast.error("Failed to load deal")
      return null
    }
  },

  async create(dealData) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.createRecord('deal_c', {
        records: [{
          Name: dealData.title_c || dealData.Name,
          title_c: dealData.title_c,
          value_c: dealData.value_c ? parseFloat(dealData.value_c) : 0,
          stage_c: dealData.stage_c,
          contact_id_c: dealData.contact_id_c ? parseInt(dealData.contact_id_c) : null,
          notes_c: dealData.notes_c || "",
          close_date_c: dealData.close_date_c || null,
          probability_c: dealData.probability_c ? parseInt(dealData.probability_c) : 50
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
          console.error(`Failed to create deal:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        return response.results[0].data
      }
      
      return response.data
    } catch (error) {
      console.error("Error creating deal:", error?.message || error)
      toast.error("Failed to create deal")
      return null
    }
  },

  async update(id, dealData) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.updateRecord('deal_c', {
        records: [{
          Id: parseInt(id),
          Name: dealData.title_c || dealData.Name,
          title_c: dealData.title_c,
          value_c: dealData.value_c ? parseFloat(dealData.value_c) : 0,
          stage_c: dealData.stage_c,
          contact_id_c: dealData.contact_id_c ? parseInt(dealData.contact_id_c) : null,
          notes_c: dealData.notes_c || "",
          close_date_c: dealData.close_date_c || null,
          probability_c: dealData.probability_c ? parseInt(dealData.probability_c) : 50
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
          console.error(`Failed to update deal:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        return response.results[0].data
      }
      
      return response.data
    } catch (error) {
      console.error("Error updating deal:", error?.message || error)
      toast.error("Failed to update deal")
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.deleteRecord('deal_c', {
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
          console.error(`Failed to delete deal:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return false
        }
      }
      
      return true
    } catch (error) {
      console.error("Error deleting deal:", error?.message || error)
      toast.error("Failed to delete deal")
      return false
    }
  },

  async updateStage(id, stage_c) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.updateRecord('deal_c', {
        records: [{
          Id: parseInt(id),
          stage_c: stage_c
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
          console.error(`Failed to update deal stage:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        return response.results[0].data
      }
      
      return response.data
    } catch (error) {
      console.error("Error updating deal stage:", error?.message || error)
      toast.error("Failed to update deal stage")
      return null
    }
  }
}
import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";
import React from "react";

export const stageService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.fetchRecords('stage_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "order_c"}}
        ],
        orderBy: [{"fieldName": "order_c", "sorttype": "ASC"}]
      })
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error("Error fetching stages:", error?.message || error)
      toast.error("Failed to load stages")
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient()
      
      const response = await apperClient.getRecordById('stage_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "order_c"}}
        ]
      })
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      return response.data
    } catch (error) {
      console.error(`Error fetching stage ${id}:`, error?.message || error)
      toast.error("Failed to load stage")
return null
    }
  }
}
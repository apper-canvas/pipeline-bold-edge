import { useState } from "react"
import { cn } from "@/utils/cn"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

const ContactForm = ({ 
  contact, 
  onSave, 
  onCancel,
  className 
}) => {
const [formData, setFormData] = useState({
    name_c: contact?.name_c || "",
    company_c: contact?.company_c || "",
    email_c: contact?.email_c || "",
    phone_c: contact?.phone_c || "",
    notes_c: contact?.notes_c || "",
    tags_c: contact?.tags_c || ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
}

    if (formData.phone && !/^[\d\s\-+().]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const submitData = {
...formData,
        tags_c: formData.tags_c
      }
      
      await onSave?.(submitData)
      toast.success(contact ? "Contact updated successfully!" : "Contact created successfully!")
    } catch (error) {
      toast.error("Failed to save contact. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
name="name_c"
          label="Full Name"
          value={formData.name_c}
          onChange={handleChange}
          error={errors.name_c}
          placeholder="Enter full name"
          required
        />
        
        <Input
          name="company_c"
          label="Company"
          value={formData.company_c}
          onChange={handleChange}
          error={errors.company_c}
          placeholder="Enter company name"
          required
        />
        
        <Input
          name="email_c"
          type="email"
          label="Email Address"
          value={formData.email_c}
          onChange={handleChange}
          error={errors.email_c}
          placeholder="Enter email address"
          required
        />
        
        <Input
          name="phone_c"
          label="Phone Number"
          value={formData.phone_c}
          onChange={handleChange}
          error={errors.phone_c}
          placeholder="Enter phone number"
        />
      </div>

<Input
        name="tags_c"
        label="Tags"
        value={formData.tags_c}
        onChange={handleChange}
        placeholder="Enter tags separated by commas (e.g., VIP, Prospect, Enterprise)"
      />

<Textarea
        name="notes_c"
        label="Notes"
        value={formData.notes_c}
        onChange={handleChange}
        placeholder="Add any additional notes about this contact..."
        rows={4}
      />

      <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <ApperIcon name="Loader2" size={16} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <ApperIcon name="Check" size={16} />
              <span>{contact ? "Update Contact" : "Create Contact"}</span>
            </>
          )}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

export default ContactForm
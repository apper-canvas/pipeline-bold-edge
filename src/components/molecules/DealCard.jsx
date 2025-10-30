import { useState } from "react"
import { cn } from "@/utils/cn"
import Avatar from "@/components/atoms/Avatar"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { formatCurrency, formatDate } from "@/utils/formatters"

const DealCard = ({ 
  deal, 
  contact,
  onDragStart,
  onDragEnd,
  onClick,
  className,
  isDragging = false
}) => {
  const [dragOver, setDragOver] = useState(false)

  const handleDragStart = (e) => {
    onDragStart?.(e, deal)
  }

  const handleDragEnd = (e) => {
    onDragEnd?.(e)
    setDragOver(false)
  }

const getPriorityColor = (stage_c) => {
    if (!stage_c) return "gray"
    switch (stage_c.toLowerCase()) {
      case "lead": return "gray"
      case "qualified": return "blue"
      case "proposal": return "yellow"
      case "negotiation": return "orange"
      case "won": return "green"
      case "lost": return "red"
      default: return "gray"
    }
  }

  return (
    <div
      className={cn(
        "deal-card",
        isDragging && "deal-card-dragging",
        dragOver && "ring-2 ring-primary-500",
        className
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onClick={() => onClick?.(deal)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate mb-1">
{deal.title_c}
          </h4>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
{contact && (
              <>
                <Avatar name={contact.name_c || contact.Name} size="sm" />
                <span className="truncate">{contact.name_c || contact.Name}</span>
              </>
            )}
          </div>
        </div>
        <ApperIcon name="GripVertical" className="h-4 w-4 text-gray-400 cursor-grab" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Value</span>
          <span className="font-bold text-gray-900 bg-gradient-to-r from-accent-600 to-accent-500 bg-clip-text text-transparent">
{formatCurrency(deal.value_c)}
          </span>
        </div>
        
{deal.close_date_c && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Close Date</span>
            <span className="text-sm font-medium text-gray-900">
              {formatDate(deal.close_date_c)}
            </span>
          </div>
        )}
{deal.probability_c && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Probability</span>
            <Badge variant="default" className="text-xs">
              {deal.probability_c}%
            </Badge>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
<Badge variant={getPriorityColor(deal.stage_c)} className="text-xs">
          {deal.stage_c}
        </Badge>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <ApperIcon name="Clock" size={12} />
          <span>2 days ago</span>
        </div>
      </div>
    </div>
  )
}

export default DealCard
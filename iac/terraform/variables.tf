variable "environment" {
  type        = string
  description = "The current application environment"
  default     = "sandbox"
}

variable "region" {
  type        = string
  description = "The region to provision our resources"
  default     = "us-east-1"
}

locals {
  api_gateway_name = "${local.resource_prefix}__external_gateway"
}

resource "aws_api_gateway_rest_api" "external" {
  body = jsonencode({
    openapi = "3.0.1"
    info = {
      title   = "${local.resource_prefix} external gateway"
      version = "1.0"
    }
    paths = {
      "/v1/health" = {
        put = {
          x-amazon-apigateway-integration = {
            httpMethod           = "GET"
            payloadFormatVersion = "1.0"
            type                 = "HTTP_PROXY"
            uri                  = "https://ip-ranges.amazonaws.com/ip-ranges.json"
          }
        }
      },
      "/v1/auth/login" = {
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "POST"
            payloadFormatVersion = "1.0"
            type                 = "HTTP_PROXY"
            uri                  = "https://ip-ranges.amazonaws.com/ip-ranges.json"
          }
        }
      },
      "/v1/counter" = {
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "GET"
            payloadFormatVersion = "1.0"
            type                 = "HTTP_PROXY"
            uri                  = "https://ip-ranges.amazonaws.com/ip-ranges.json"
          }
        }
      },
      "/v1/counter" = {
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "PATCH"
            payloadFormatVersion = "1.0"
            type                 = "HTTP_PROXY"
            uri                  = "https://ip-ranges.amazonaws.com/ip-ranges.json"
          }
        }
      },
      "/v1/user" = {
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "GET"
            payloadFormatVersion = "1.0"
            type                 = "HTTP_PROXY"
            uri                  = "https://ip-ranges.amazonaws.com/ip-ranges.json"
          }
        }
      },
      "/v1/user" = {
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "POST"
            payloadFormatVersion = "1.0"
            type                 = "HTTP_PROXY"
            uri                  = "https://ip-ranges.amazonaws.com/ip-ranges.json"
          }
        }
      }
    }
  })

  name        = local.api_gateway_name
  description = "External gateway for the ton countapi ecosystem"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

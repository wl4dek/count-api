locals {
  product              = "ton-countapi"
  team                 = "ton"
  owner                = "liquidity"
  env                  = var.environment
  app                  = "countapi"
  resource_prefix      = "${local.team}-${local.app}"
  ssm_parameter_prefix = "/${local.team}/${local.app}"
  default_tags = {
    "product" = local.product
    "team"    = local.team
    "owner"   = local.owner
    "env"     = local.env
  }
}

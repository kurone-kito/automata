provider "multipass" {}

resource "multipass_instance" "build" {
  cloudinit_file = "${path.module}/cloud-init.yml"
  disk           = "10G"
  image          = "resolute"
  memory         = "2G"
  name           = "automata"
}

terraform {
  required_providers {
    multipass = {
      source  = "larstobi/multipass"
      version = "~> 1.4"
    }
  }
}

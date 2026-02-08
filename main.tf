provider "multipass" {}

resource "multipass_instance" "build" {
  cloudinit_file = "${path.module}/cloud-init.yml"
  image          = "resolute"
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

provider "multipass" {}

resource "multipass_instance" "build" {
  image = "resolute"
  name  = "automata"
}

terraform {
  required_providers {
    multipass = {
      source  = "larstobi/multipass"
      version = "~> 1.4"
    }
  }
}

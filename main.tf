provider "multipass" {}

resource "multipass_instance" "build" {
  cpus  = 2
  image = "questing"
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

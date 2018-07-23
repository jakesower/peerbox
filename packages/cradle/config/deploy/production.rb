# NOTE: run `ssh-add` to get keys imported

server "jakesower.com",
  user: "deploy",
  roles: %w{web app},
  ssh_options: {
    user: "deploy", # overrides user setting above
    keys: %w(/home/jake/.ssh/id_rsa),
    forward_agent: true,
  }

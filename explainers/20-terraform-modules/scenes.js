const S = [
  { t: 0,  title: 'Copy, paste, <hl c="red">repeat?</hl>', pose: [[0,"shrug"]], mood: "curious",
    cap: [[0,"Copy-pasting the same Terraform code into every project?"],[4,"Stop. Use a module."]], prop: "copy" },
  { t: 7,  title: 'Module = <hl c="tape">toolbox</hl>', pose: [[0,"present"]], mood: "happy",
    cap: [[0,"A module is a reusable kit:"],[2,"like a toolbox you grab whenever you need it."]], prop: "kit" },
  { t: 13, step: 1, title: 'Grab the <hl c="tape">kit</hl>', pose: [[0,"point"]], mood: "happy",
    cap: [[0,"Call it with a module block, and pass in variables."],[4,"One kit... many projects."]], prop: "use" },
  { t: 21, step: 2, title: 'The <hl c="teal">Registry</hl>', pose: [[0,"present"]], mood: "happy",
    cap: [[0,"The Terraform Registry has thousands of ready-made modules."]], prop: "registry" },
  { t: 26, step: 3, title: 'Keep it <hl c="teal">tidy</hl>', pose: [[0,"both"]], mood: "happy",
    cap: [[0,"Two helpers: terraform fmt tidies your code."],[4,"terraform validate checks it for mistakes."]], prop: "tidy" },
  { t: 33, title: 'Clean up: <hl c="red">destroy</hl>', pose: [[0,"point"],[4.2,"cheer"]], mood: "happy",
    cap: [[0,"Done experimenting? terraform destroy removes everything."],[4,"No forgotten servers. No surprise bills."]], prop: "destroy" },
  { t: 41, title: 'Terraform: <hl c="teal">done!</hl>', pose: [[0,"thumb"]], mood: "happy",
    cap: [[0,"And that's Terraform basics:"],[2,"write, init, plan, apply, state, modules."]], prop: "recap" },
  { t: 48, title: 'Next: <hl c="tape">monitoring?</hl>', pose: [[0,"peace"]], mood: "happy",
    cap: [[0,"Next topic: monitoring?"],[2,"Comment MONITOR, and follow."]], prop: "next" },
];
let END = 54.5;

const S = [
  { t: 0,  title: 'Tests pass. <hl c="orange">Ship it.</hl>', pose: [[0,"present"]], mood: "happy",
    cap: [[0,"Tests pass. Now ship it... without touching a server."]], prop: "pad" },
  { t: 4,  step: 1, title: 'A <hl c="orange">deploy</hl> job', pose: [[0,"point"]], mood: "happy",
    cap: [[0,"Add a deploy job."],[2,"needs: test... it only runs if the tests pass."],[6,"And only on the main branch."]], prop: "job" },
  { t: 13, step: 2, title: 'Keep <hl c="red">secrets</hl> secret', pose: [[0,"shrug"],[5,"point"]], mood: "serious",
    cap: [[0,"Deploying needs a password or token."],[3,"Never put it in your code!"],[5,"Save it in Settings, Secrets."],[8,"Then use it as secrets.DEPLOY_TOKEN"],[12,"GitHub hides it in the logs."]], prop: "secrets" },
  { t: 28, step: 3, title: 'A <hl c="violet">safety check</hl>', pose: [[0,"present"]], mood: "happy",
    cap: [[0,"Want a safety check?"],[2,"Environments can ask for approval before production."]], prop: "approve" },
  { t: 34, title: 'Merge → <hl c="orange">lift-off!</hl>', pose: [[0,"both"],[5,"cheer"]], mood: "happy",
    cap: [[0,"Now: merge to main..."],[2,"test... build... deploy."],[5,"Your app is live. Automatically."]], prop: "launch" },
  { t: 43, title: 'That\'s <hl c="violet">CI/CD</hl>!', pose: [[0,"thumb"]], mood: "happy",
    cap: [[0,"And that's CI/CD: push, test, build, deploy."]], prop: "recap" },
  { t: 48, title: 'Next: <hl c="orange">Terraform?</hl>', pose: [[0,"peace"]], mood: "happy",
    cap: [[0,"Next topic: Terraform?"],[2,"Comment TERRAFORM, and follow."]], prop: "next" },
];
let END = 54.5;

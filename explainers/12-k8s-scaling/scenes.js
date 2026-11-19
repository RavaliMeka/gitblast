const S = [
  { t: 0,  title: 'You went <hl c="pink">viral!</hl>', pose: [[0,"present"]], mood: "happy",
    cap: [[0,"Your app goes viral. Traffic is ten times bigger."],[3,"Will it crash?"]], prop: "viral" },
  { t: 5,  step: 1, title: 'Scale <hl c="blue">by hand</hl>', pose: [[0,"point"]], mood: "happy",
    cap: [[0,"Not with Kubernetes."],[1,"Scale by hand: kubectl scale, replicas ten."],[5,"Ten pods, in seconds."]], prop: "manual" },
  { t: 13, step: 2, title: 'Or <hl c="green">autoscale</hl>', pose: [[0,"idea"]], mood: "happy",
    cap: [[0,"Even better: let it scale itself."],[2,"The autoscaler watches the CPU."],[5,"Busy? It adds pods. Quiet? It removes them."]], prop: "auto" },
  { t: 22, step: 3, title: '<hl c="blue">Rolling</hl> update', pose: [[0,"both"]], mood: "happy",
    cap: [[0,"Now, shipping a new version."],[2,"Kubernetes does a rolling update:"],[4,"it swaps old pods for new ones, a few at a time."],[8,"Users never see downtime."]], prop: "rolling" },
  { t: 32, title: 'Broke it? <hl c="pink">Undo.</hl>', pose: [[0,"shrug"],[2.4,"cheer"]], mood: "happy",
    cap: [[0,"Something broke?"],[2,"kubectl rollout undo... back to the last version."]], prop: "undo" },
  { t: 38, title: 'K8s basics: <hl c="green">done!</hl>', pose: [[0,"thumb"]], mood: "happy",
    cap: [[0,"And that's Kubernetes basics:"],[2,"cluster, pods, deployments, services, ingress, scaling."]], prop: "recap" },
  { t: 46, title: 'Next: <hl c="pink">CI/CD?</hl>', pose: [[0,"peace"]], mood: "happy",
    cap: [[0,"Next topic: CI/CD... shipping code automatically."],[4,"Comment CICD if you want it, and follow."]], prop: "next" },
];
let END = 55;

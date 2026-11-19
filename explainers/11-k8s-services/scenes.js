const S = [
  { t: 0,  title: 'How do users <hl c="red">get in</hl>?', pose: [[0,"shrug"]], mood: "curious",
    cap: [[0,"Your pods are running... but how do users reach them?"],[3,"Pods come and go. Their addresses keep changing."]], prop: "changing" },
  { t: 7,  title: 'Meet the <hl c="red">Service</hl>', pose: [[0,"idea"]], mood: "happy",
    cap: [[0,"So Kubernetes gives you a Service."]], prop: "meet" },
  { t: 9,  title: 'Think: <hl c="gold">restaurant</hl>', pose: [[0,"present"]], mood: "happy",
    cap: [[0,"Think of a restaurant."],[2,"Pods are the tables: they change all the time."],[5,"The Service is the host at the door."]], prop: "restaurant" },
  { t: 16, step: 1, title: 'That\'s <hl c="red">load balancing</hl>', pose: [[0,"point"]], mood: "happy",
    cap: [[0,"Customers just say \"a table, please\"..."],[3,"and the host sends them to a free one."],[5,"That's load balancing."]], prop: "balance" },
  { t: 24, step: 2, title: 'Two <hl c="gold">kinds</hl>', pose: [[0,"present"]], mood: "happy",
    cap: [[0,"A ClusterIP service works inside the cluster."],[3,"A LoadBalancer service opens it to the internet."]], prop: "kinds" },
  { t: 30, step: 3, title: 'One <hl c="red">front door</hl>', pose: [[0,"both"],[9,"cheer"]], mood: "happy",
    cap: [[0,"Got many services?"],[2,"An Ingress is the front entrance, with signs:"],[5,"/shop goes here... /api goes there."],[9,"One address. Traffic goes to the right place."]], prop: "ingress" },
  { t: 43, title: 'Remember', pose: [[0,"thumb"]], mood: "happy",
    cap: [[0,"Service: a stable address."],[2.4,"Ingress: smart routing."]], prop: "recap" },
  { t: 48, title: 'Next: <hl c="gold">scaling</hl>', pose: [[0,"peace"]], mood: "happy",
    cap: [[0,"Next: scaling, and updates with zero downtime."],[3.6,"Follow for part four."]], prop: "next" },
];
let END = 54.5;

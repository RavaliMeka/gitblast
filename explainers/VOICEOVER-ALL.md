# Voice-over scripts: episodes 2–30

## How to record

- **Pace:** each script is about 60 seconds. Speak a little slower than feels natural.
- **Marks:** `/` is a short breath. A new paragraph is a pause of about one second.
- **Smile on the first line.** The opening line is the hook; give it the most energy.
- **Lift your voice on the win.** Every episode has one “it worked” moment, marked 🎉.
- **Commands:** say them slowly and clearly, one word at a time.
- **“Say” lines:** where a line has a command, symbol, number or short form, the line under it (🗣) spells out exactly what to say.
- **Word tables:** every technical or longer word in an episode is listed in the order you meet it, with the stressed part in CAPITALS. Everyday words (the, run, your) are left out.
- **Fumbles:** repeat the line and keep going. The bad take gets cut.
- **Room:** quiet room, phone a hand's width from your mouth, same spot every time.
- **One file per episode,** named with the episode number.


# Git

## Episode 2: Git Branches

*About 62 seconds · 127 words*

**Say it like this**

| Word | How to say it |
|---|---|
| branches | BRAN-chiz |
| branch | branch |
| experiment | ik-SPAIR-i-ment |
| git | git (hard G, as in “give”) |
| -c | “dash c” |
| commit | kuh-MIT |
| merge | murj |
| conflicts | KON-flikts |

**Script**

> One bad change can break your whole app. / So how do pros add features safely?
>
> That's what branches are for. / Think of a branch as a second save slot. / You experiment there... main stays safe.
>
> Your real code lives on the main branch.
>
> To start something new, / run git switch -c feature.
> 🗣 *Say:* To start something new, / run git switch dash c feature.
>
> Now you're on the feature branch. / Every commit lands here... / main doesn't change.
>
> Totally broke it? / Just delete the branch. / Main is untouched.
>
> Feature working? / Switch back with git switch main, / then run git merge feature... / and it's in! 🎉
>
> Working with a team? / Push your branch and open a pull request, / so others can review it first.
>
> Branch. Commit. Merge. / That's the whole idea.
>
> Next up: merge conflicts. / If this helped, / follow along for more.

## Episode 3: Merge Conflicts

*About 58 seconds · 103 words*

**Say it like this**

| Word | How to say it |
|---|---|
| merge | murj |
| branch | branch |
| git | git (hard G, as in “give”) |
| conflict | KON-flikt |
| branches | BRAN-chiz |
| commit | kuh-MIT |

**Script**

> You merge a branch... / and Git says... CONFLICT. / Don't panic. It's normal.
>
> A conflict happens when two branches / change the same line.
>
> Say main says "Hello"... / and your feature says "Hi there".
>
> Git can't guess which one you want, / so it asks you.
>
> Open the file. / You'll see these markers. / Above the line: your version. / Below it: theirs.
>
> Keep one, or combine both, / then delete the markers.
>
> Now run git add... / and git commit. / Conflict solved! 🎉
>
> Pro tip: pull often / and keep branches small.
>
> Conflict. Fix the file. / Add. Commit. / That's it.
>
> Next up: undoing mistakes. / If this helped, / follow along for more.

## Episode 4: Undoing Mistakes

*About 59 seconds · 108 words*

**Say it like this**

| Word | How to say it |
|---|---|
| git | git (hard G, as in “give”) |
| committed | kuh-MIT-id |
| restore | ri-STOR |
| reset | ree-SET |
| commit | kuh-MIT |
| commits | kuh-MITS |
| revert | ri-VURT |
| docker | DOK-er |

**Script**

> We all make mistakes... / even in Git.
>
> The good news? / Git has an undo button. / Actually... three.
>
> One: changed a file but haven't committed? / git restore throws your changes away.
>
> Two: committed, and want to take it back? / git reset moves you back to an earlier commit. / Careful: only on commits you haven't pushed.
>
> Three: already pushed and shared? / Use git revert. / It makes a new commit that cancels the old one. / History stays safe for everyone.
>
> Quick rule: / Not committed... restore. / Not pushed... reset. / Pushed... revert.
>
> And that's a wrap on Git basics! 🎉
>
> Next, we start a brand-new topic: Docker. / If this helped, follow along for more.

# Docker

## Episode 5: What is Docker

*About 59 seconds · 123 words*

**Say it like this**

| Word | How to say it |
|---|---|
| developer | di-VEL-uh-per |
| libraries | LY-brer-eez |
| docker | DOK-er |
| container | kun-TAY-ner |
| dockerfile | DOK-er-file |
| image | IM-ij |
| containers | kun-TAY-nerz |

**Script**

> "It works on my machine!" / Every developer has said this.
>
> Then it breaks on the server. / Why?
>
> Different setup: / different versions, missing libraries.
>
> Docker fixes this.
>
> Think of a shipping container. / Whatever's inside... it fits every ship.
>
> Docker packs your app / with everything it needs, into one box.
>
> The recipe for that box / is a Dockerfile.
>
> Build it, and you get an image: / a frozen snapshot of your app.
>
> Run the image, and you get a container: / your app, alive and running.
>
> One image... / can run as many containers as you want.
>
> Same box on your laptop, / on the server, in the cloud. / Works everywhere. 🎉
>
> Three words to remember: / Dockerfile. Image. Container.
>
> Want your first Dockerfile? / Comment DOCKER... / and follow for part two.

## Episode 6: Your First Dockerfile

*About 59 seconds · 108 words*

**Say it like this**

| Word | How to say it |
|---|---|
| dockerfile | DOK-er-file |
| node | nohd |
| WORKDIR | “work-dir” |
| npm | en-pee-em |
| libraries | LY-brer-eez |
| CMD | “C-M-D” |
| docker | DOK-er |
| -t | “dash t” |
| my-app | “my app” |
| -p | “dash p” |
| 3000:3000 | “three thousand, colon, three thousand” |
| localhost | LOCAL-host |
| 3000 | “three thousand” |
| volumes | VOL-yoomz |

**Script**

> You asked for it... / your first Dockerfile, in sixty seconds.
>
> A Dockerfile is a recipe. / Each line is one step.
>
> Line one: FROM node twenty. / Start from a ready-made base... like a pizza base.
>
> WORKDIR slash app: / make a folder inside the box.
> 🗣 *Say:* work-dir slash app: / make a folder inside the box.
>
> COPY dot dot: / put your code inside.
>
> RUN npm install: / install the libraries.
>
> EXPOSE three thousand: / the door your app talks through.
>
> CMD node app dot js: / what runs when the box starts.
> 🗣 *Say:* C-M-D node app dot js: / what runs when the box starts.
>
> Now build it: docker build -t my-app . / And run it: docker run -p 3000:3000 my-app
> 🗣 *Say:* Now build it: docker build dash t my app . / And run it: docker run dash p three thousand, colon, three thousand my app
>
> Open localhost 3000... it's alive! 🎉
> 🗣 *Say:* Open localhost three thousand... it's alive!
>
> Next: ports and volumes. / Save this, and follow for part three.

## Episode 7: Docker Ports and Volumes

*About 54 seconds · 102 words*

**Say it like this**

| Word | How to say it |
|---|---|
| container | kun-TAY-ner |
| volumes | VOL-yoomz |
| apartment | uh-PART-ment |
| -p | “dash p” |
| 8000:3000 | “eight thousand, colon, three thousand” |
| 8000 | “eight thousand” |
| 3000 | “three thousand” |
| volume | VOL-yoom |
| -v | “dash v” |
| my-data:/data | “my data, colon, slash data” |
| docker | DOK-er |
| compose | kum-POHZ |
| containers | kun-TAY-nerz |

**Script**

> Your container is running... but you can't reach it? / Or your data vanished on restart?
>
> Two fixes: ports and volumes.
>
> A container is like a sealed apartment.
>
> Ports are the door number. / -p 8000:3000 / knock on 8000 outside... reach 3000 inside.
> 🗣 *Say:* Ports are the door number. / dash p eight thousand, colon, three thousand / knock on eight thousand outside... reach three thousand inside.
>
> Now, data. / Delete a container... and everything inside goes with it.
>
> A volume is a storage locker outside the apartment. / -v my-data:/data / connects the locker to the container.
> 🗣 *Say:* A volume is a storage locker outside the apartment. / dash v my data, colon, slash data / connects the locker to the container.
>
> Delete the container... / start a new one... / your data is still there! 🎉
>
> Ports: let traffic in. / Volumes: keep data safe.
>
> Next: Docker Compose... many containers, one command. / Follow so you don't miss it.

## Episode 8: Docker Compose

*About 55 seconds · 100 words*

**Say it like this**

| Word | How to say it |
|---|---|
| API | “A-P-I” |
| containers | kun-TAY-nerz |
| docker | DOK-er |
| compose | kum-POHZ |
| orchestra | OR-kes-truh |
| container | kun-TAY-ner |
| conductor | kun-DUK-ter |
| compose.yaml | “compose dot YAM-ul” |
| services | SUR-vis-iz |
| images | IM-ij-iz |
| volumes | VOL-yoomz |
| depends_on | “depends on” |
| dockerfile | DOK-er-file |
| image | IM-ij |
| kubernetes | koo-ber-NET-eez |
| K8S | “kates” |

**Script**

> Your app needs a website, an API... and a database.
> 🗣 *Say:* Your app needs a website, an A-P-I... and a database.
>
> Three containers... three long commands?
>
> There's a better way: Docker Compose.
>
> Think of an orchestra. / Each musician is a container. / Compose is the conductor.
>
> You write one file: compose.yaml. / List your services: web, API, database. / Add their images, ports and volumes. / depends_on... tells who starts first.
> 🗣 *Say:* You write one file: compose dot YAM-ul. / List your services: web, A-P-I, database. / Add their images, ports and volumes. / depends on... tells who starts first.
>
> Then one command: docker compose up. / Everything starts together! 🎉
>
> docker compose down... stops it all.
>
> Same file works for your whole team.
>
> And that's Docker basics: / Dockerfile, image, container, ports, volumes, Compose.
>
> Next topic: Kubernetes? Comment K8S if you want it. / Follow for more.
> 🗣 *Say:* Next topic: Kubernetes? Comment kates if you want it. / Follow for more.

# Kubernetes

## Episode 9: What is Kubernetes

*About 57 seconds · 120 words*

**Say it like this**

| Word | How to say it |
|---|---|
| docker | DOK-er |
| container | kun-TAY-ner |
| kubernetes | koo-ber-NET-eez |
| containers | kun-TAY-nerz |
| cluster | KLUS-ter |
| nodes | nohdz |
| pods | podz |
| node | nohd |
| pod | pod |

**Script**

> Docker runs one container. / But what about a hundred?
>
> Who restarts them when they crash? / Who adds more when traffic spikes?
>
> That's Kubernetes.
>
> Think of an airport control tower. / Planes are your containers. / The tower decides where each one lands.
>
> A Kubernetes setup is called a cluster.
>
> It has worker machines, called nodes.
>
> Your containers run inside pods, on those nodes.
>
> And the control plane is the tower: the brain.
>
> You don't say "run this on machine three." / You just say what you want: three copies of my app.
>
> Kubernetes makes it happen... and keeps it that way.
>
> A node goes down? / Pods move to another one. 🎉
>
> Cluster. Node. Pod. Control plane.
>
> Next: pods and self-healing. / Follow for part two.

## Episode 10: Kubernetes Pods and Deployments

*About 57 seconds · 111 words*

**Say it like this**

| Word | How to say it |
|---|---|
| a.m | “A-M” |
| kubernetes | koo-ber-NET-eez |
| pod | pod |
| container | kun-TAY-ner |
| pods | podz |
| deployment | di-PLOY-ment |
| replicas | REP-li-kuz |
| image | IM-ij |
| kubectl | kube control |
| -f | “dash f” |
| deploy.yaml | “deploy dot YAM-ul” |

**Script**

> What happens when your app crashes at 3 a.m.? / With Kubernetes... nothing. You sleep.
> 🗣 *Say:* What happens when your app crashes at 3 A-M.? / With Kubernetes... nothing. You sleep.
>
> Here's why. / A pod is the smallest thing Kubernetes runs. / Usually one container inside.
>
> Think of pods as plants in a greenhouse.
>
> A Deployment is the gardener. / You tell it: always keep three plants.
>
> One plant dies? / The gardener notices... and plants a new one. / That's self-healing.
>
> Here's the file: kind Deployment, replicas three, and your image.
>
> Apply it: kubectl apply -f deploy.yaml / Check with kubectl get pods.
> 🗣 *Say:* Apply it: kubectl apply dash f deploy dot YAM-ul / Check with kubectl get pods.
>
> Delete a pod on purpose... / and watch a new one appear. 🎉
>
> Pod: runs your container. / Deployment: keeps them alive.
>
> Next: how users reach your pods. / Follow for part three.

## Episode 11: Kubernetes Services and Ingress

*About 55 seconds · 121 words*

**Say it like this**

| Word | How to say it |
|---|---|
| pods | podz |
| kubernetes | koo-ber-NET-eez |
| service | SUR-vis |
| ClusterIP | “cluster I-P” |
| cluster | KLUS-ter |
| LoadBalancer | “load balancer” |
| services | SUR-vis-iz |
| ingress | IN-gress |
| /shop | “slash shop” |
| /api | “slash A-P-I” |

**Script**

> Your pods are running... but how do users reach them? / Pods come and go. Their addresses keep changing.
>
> So Kubernetes gives you a Service.
>
> Think of a restaurant. / Pods are the tables: they change all the time. / The Service is the host at the door.
>
> Customers just say "a table, please"... / and the host sends them to a free one. / That's load balancing.
>
> A ClusterIP service works inside the cluster. / A LoadBalancer service opens it to the internet.
> 🗣 *Say:* A cluster I-P service works inside the cluster. / A load balancer service opens it to the internet.
>
> Got many services? / An Ingress is the front entrance, with signs: / /shop goes here... /api goes there. / One address. Traffic goes to the right place. 🎉
> 🗣 *Say:* Got many services? / An Ingress is the front entrance, with signs: / slash shop goes here... slash A-P-I goes there. / One address. Traffic goes to the right place.
>
> Service: a stable address. / Ingress: smart routing.
>
> Next: scaling, and updates with zero downtime. / Follow for part four.

## Episode 12: Kubernetes Scaling and Rolling Updates

*About 55 seconds · 105 words*

**Say it like this**

| Word | How to say it |
|---|---|
| kubernetes | koo-ber-NET-eez |
| kubectl | kube control |
| replicas | REP-li-kuz |
| pods | podz |
| autoscaler | AW-toh-skay-ler |
| CPU | “C-P-U” |
| cluster | KLUS-ter |
| deployments | di-PLOY-ments |
| services | SUR-vis-iz |
| ingress | IN-gress |
| CI/CD | “C-I C-D” |
| automatically | aw-tuh-MAT-ik-lee |
| CICD | “C-I C-D” |

**Script**

> Your app goes viral. Traffic is ten times bigger. / Will it crash?
>
> Not with Kubernetes. / Scale by hand: kubectl scale, replicas ten. / Ten pods, in seconds.
>
> Even better: let it scale itself. / The autoscaler watches the CPU. / Busy? It adds pods. Quiet? It removes them.
> 🗣 *Say:* Even better: let it scale itself. / The autoscaler watches the C-P-U. / Busy? It adds pods. Quiet? It removes them.
>
> Now, shipping a new version. / Kubernetes does a rolling update: / it swaps old pods for new ones, a few at a time. / Users never see downtime.
>
> Something broke? / kubectl rollout undo... back to the last version. 🎉
>
> And that's Kubernetes basics: / cluster, pods, deployments, services, ingress, scaling.
>
> Next topic: CI/CD... shipping code automatically. / Comment CICD if you want it, and follow.
> 🗣 *Say:* Next topic: C-I C-D... shipping code automatically. / Comment C-I C-D if you want it, and follow.

# CI/CD with GitHub Actions

## Episode 13: What is CI/CD

*About 59 seconds · 114 words*

**Say it like this**

| Word | How to say it |
|---|---|
| deploy | di-PLOY |
| CI/CD | “C-I C-D” |
| CI | “C-I” |
| continuous | kun-TIN-yoo-us |
| integration | in-tuh-GRAY-shun |
| automatically | aw-tuh-MAT-ik-lee |
| CD | “C-D” |
| delivery | di-LIV-uh-ree |
| GitHub | “GIT-hub” |
| workflow | WURK-floh |

**Script**

> You fixed a bug. Now what? / Test it, build it, upload it, deploy it... by hand? / Every. Single. Time?
>
> That's where CI/CD comes in.
> 🗣 *Say:* That's where C-I C-D comes in.
>
> Think of a factory assembly line. / Your code goes in one end... / and a tested, working app comes out the other.
>
> CI is continuous integration: / every push gets built and tested automatically. / Broken code gets caught before it spreads.
> 🗣 *Say:* C-I is continuous integration: / every push gets built and tested automatically. / Broken code gets caught before it spreads.
>
> CD is continuous delivery: / code that passes gets shipped automatically. / No late-night manual deploys.
> 🗣 *Say:* C-D is continuous delivery: / code that passes gets shipped automatically. / No late-night manual deploys.
>
> The tool we'll use is GitHub Actions. / It's built into GitHub, and free to start.
> 🗣 *Say:* The tool we'll use is GIT-hub Actions. / It's built into GIT-hub, and free to start.
>
> Push code... robots do the rest. 🎉
>
> CI: test every change. / CD: ship every change.
> 🗣 *Say:* C-I: test every change. / C-D: ship every change.
>
> Next: your first workflow. / Follow for part two.

## Episode 14: First GitHub Actions Workflow

*About 57 seconds · 98 words*

**Say it like this**

| Word | How to say it |
|---|---|
| GitHub | “GIT-hub” |
| workflow | WURK-floh |
| repo | REE-poh |
| .github/workflows | “dot github, slash, workflows” |
| CI | “C-I” |
| runs-on | “runs on” |
| ubuntu-latest | “oo-BOON-too latest” |
| checkout | CHEK-owt |
| npm | en-pee-em |
| commit | kuh-MIT |
| merge | murj |

**Script**

> Let's make GitHub work for you. / Lights, camera... Actions!
> 🗣 *Say:* Let's make GIT-hub work for you. / Lights, camera... Actions!
>
> A workflow is just a file in your repo. / It lives in .github/workflows
> 🗣 *Say:* A workflow is just a file in your repo. / It lives in dot github, slash, workflows
>
> Line one: name. Call it CI.
> 🗣 *Say:* Line one: name. Call it C-I.
>
> on push: the trigger. / It runs every time you push.
>
> jobs: the work to do.
>
> runs-on ubuntu-latest: / a fresh machine GitHub lends you, called a runner.
> 🗣 *Say:* runs on oo-BOON-too latest: / a fresh machine GIT-hub lends you, called a runner.
>
> steps: checkout grabs your code... / then run npm install... and npm test.
>
> Commit the file and push.
>
> Open the Actions tab... / and watch it run, live. / Green check: it passed! 🎉
>
> Trigger. Job. Runner. Steps.
>
> Next: catching bugs before they merge. / Follow for part three.

## Episode 15: CI on Pull Requests

*About 56 seconds · 105 words*

**Say it like this**

| Word | How to say it |
|---|---|
| pull_request | “pull request” |
| PR | “P-R” |
| node | nohd |
| branch | branch |
| protection | pruh-TEK-shun |
| merge | murj |
| deploying | di-PLOY-ing |
| automatically | aw-tuh-MAT-ik-lee |

**Script**

> Ever merged a pull request... that broke everything? / Let's make that impossible.
>
> Change the trigger to pull_request. / Now every PR gets tested before it merges.
> 🗣 *Say:* Change the trigger to pull request. / Now every P-R gets tested before it merges.
>
> Add more jobs: lint, test, build. / They run at the same time, on separate runners.
>
> Need to test several versions? / A matrix runs the same job on Node 18, 20 and 22.
>
> If anything fails... red X. / Turn on branch protection, and the merge button stays locked.
>
> Fix the code, push again... / all green. Now you can merge. 🎉
>
> Bugs get caught by robots... not by your users.
>
> PR trigger. Parallel jobs. Matrix. Protection.
> 🗣 *Say:* P-R trigger. Parallel jobs. Matrix. Protection.
>
> Next: deploying automatically. / Follow for part four.

## Episode 16: CD and Secrets with GitHub Actions

*About 55 seconds · 93 words*

**Say it like this**

| Word | How to say it |
|---|---|
| deploy | di-PLOY |
| branch | branch |
| deploying | di-PLOY-ing |
| token | TOH-kun |
| secrets | SEE-krits |
| secrets.DEPLOY_TOKEN | “secrets dot deploy token” |
| GitHub | “GIT-hub” |
| environments | en-VY-run-ments |
| production | pruh-DUK-shun |
| merge | murj |
| automatically | aw-tuh-MAT-ik-lee |
| CI/CD | “C-I C-D” |
| terraform | TERRA-form |

**Script**

> Tests pass. Now ship it... without touching a server.
>
> Add a deploy job. / needs: test... it only runs if the tests pass. / And only on the main branch.
>
> Deploying needs a password or token. / Never put it in your code! / Save it in Settings, Secrets. / Then use it as secrets.DEPLOY_TOKEN / GitHub hides it in the logs.
> 🗣 *Say:* Deploying needs a password or token. / Never put it in your code! / Save it in Settings, Secrets. / Then use it as secrets dot deploy token / GIT-hub hides it in the logs.
>
> Want a safety check? / Environments can ask for approval before production.
>
> Now: merge to main... / test... build... deploy. / Your app is live. Automatically. 🎉
>
> And that's CI/CD: push, test, build, deploy.
> 🗣 *Say:* And that's C-I C-D: push, test, build, deploy.
>
> Next topic: Terraform? / Comment TERRAFORM, and follow.

# Terraform

## Episode 17: What is Terraform

*About 56 seconds · 109 words*

**Say it like this**

| Word | How to say it |
|---|---|
| infrastructure | IN-fruh-struk-cher |
| instruction | in-STRUK-shun |
| terraform | TERRA-form |
| AWS | “A-W-S” |
| providers | pruh-VY-derz |
| staging | STAY-jing |
| production | pruh-DUK-shun |
| identical | eye-DEN-ti-kul |

**Script**

> Setting up servers by clicking around a cloud console? / Slow... and impossible to repeat exactly.
>
> There's a better way: infrastructure as code.
>
> Think of building blocks with an instruction booklet. / Follow the booklet... get the same model every time.
>
> With Terraform, you write what you want in a file: / a server, a database, a network.
>
> Terraform reads it... and builds it for you.
>
> It works with AWS, Azure, Google Cloud, and more. / Those plugins are called providers.
> 🗣 *Say:* It works with A-W-S, Azure, Google Cloud, and more. / Those plugins are called providers.
>
> Need a change? Edit the file. / Terraform updates only what's different.
>
> Dev, staging, production: identical. No surprises. 🎉
>
> Write it. Review it. Reuse it.
>
> Next: your first Terraform commands. / Follow for part two.

## Episode 18: Terraform init, plan, apply

*About 56 seconds · 88 words*

**Say it like this**

| Word | How to say it |
|---|---|
| terraform | TERRA-form |
| main.tf | “main dot T-F” |
| provider | pruh-VY-der |
| resource | REE-sors |
| init | in-IT |
| destroyed | di-STROYD |
| state | stayt |
| variables | VAIR-ee-uh-bulz |

**Script**

> Three commands run almost everything in Terraform. / Think of planning a hike.
>
> First, a file: main.tf / A provider... and one resource: a server.
> 🗣 *Say:* First, a file: main dot T-F / A provider... and one resource: a server.
>
> terraform init: pack your gear. / It downloads the provider plugins.
>
> terraform plan: check the map. / It shows exactly what will change... before anything happens. / One to add. Nothing destroyed.
>
> terraform apply: start walking. / Type yes... and it builds.
>
> Your server is live. Created from code. 🎉
>
> Golden rule: always read the plan before you apply.
>
> Init. Plan. Apply.
>
> Next: state and variables. / Follow for part three.

## Episode 19: Terraform State and Variables

*About 57 seconds · 111 words*

**Say it like this**

| Word | How to say it |
|---|---|
| terraform | TERRA-form |
| state | stayt |
| terraform | TERRA-form |
| terraform.tfstate | “terraform dot T-F-state” |
| resources | REE-sor-siz |
| commit | kuh-MIT |
| git | git (hard G, as in “give”) |
| secrets | SEE-krits |
| variables | VAIR-ee-uh-bulz |
| variable | VAIR-ee-uh-bul |
| customize | KUS-tuh-mize |
| modules | MOJ-oolz |

**Script**

> How does Terraform know what it already built? / It keeps a record: the state file.
>
> Think of a librarian's ledger. / Every book on the shelf is written down.
>
> Terraform's ledger is terraform.tfstate / It maps your code to real resources.
> 🗣 *Say:* Terraform's ledger is terraform dot T-F-state / It maps your code to real resources.
>
> Never edit it by hand. / And never commit it to Git: it can hold secrets.
>
> Teams keep it in remote storage, with a lock, / so two people can't change things at once.
>
> Now, variables. / Don't hard-code values. Use a variable. / Same code... different settings for dev and prod.
>
> And outputs print useful results, like your server's address.
>
> State remembers. Variables customize. Outputs report.
>
> Next: modules, and cleaning up. / Follow for part four.

## Episode 20: Terraform Modules and Destroy

*About 55 seconds · 91 words*

**Say it like this**

| Word | How to say it |
|---|---|
| terraform | TERRA-form |
| module | MOJ-ool |
| variables | VAIR-ee-uh-bulz |
| modules | MOJ-oolz |
| validate | VAL-i-dayt |
| destroy | di-STROY |
| init | in-IT |
| state | stayt |
| monitoring | MON-i-ter-ing |

**Script**

> Copy-pasting the same Terraform code into every project? / Stop. Use a module.
>
> A module is a reusable kit: / like a toolbox you grab whenever you need it.
>
> Call it with a module block, and pass in variables. / One kit... many projects.
>
> The Terraform Registry has thousands of ready-made modules.
>
> Two helpers: terraform fmt tidies your code. / terraform validate checks it for mistakes.
>
> Done experimenting? terraform destroy removes everything. / No forgotten servers. No surprise bills. 🎉
>
> And that's Terraform basics: / write, init, plan, apply, state, modules.
>
> Next topic: monitoring? / Comment MONITOR, and follow.

# DevSecOps

## Episode 21: What is DevSecOps?

*About 59 seconds · 110 words*

**Say it like this**

| Word | How to say it |
|---|---|
| security | si-KYOOR-i-tee |
| DevSecOps | “dev-SEK-ops” |
| automatically | aw-tuh-MAT-ik-lee |
| SAST | “sast” |
| SCA | “S-C-A” |
| libraries | LY-brer-eez |
| DAST | “dast” |
| secret | SEE-krit |
| scanning | SKAN-ing |
| CI | “C-I” |
| pipeline | PIPE-line |
| merge | murj |

**Script**

> Most teams test security at the very end. / That's when fixes cost the most.
>
> DevSecOps fixes that. / Security checks run at every step, automatically.
> 🗣 *Say:* dev-SEK-ops fixes that. / Security checks run at every step, automatically.
>
> It's called shifting left: / catch problems early, while they're cheap to fix.
>
> Like building a house: / check the wiring before the walls go up.
>
> Four checks do most of the work. / SAST reads your code. / SCA checks your libraries. / DAST attacks the running app. / And secret scanning finds leaked passwords.
> 🗣 *Say:* Four checks do most of the work. / sast reads your code. / S-C-A checks your libraries. / dast attacks the running app. / And secret scanning finds leaked passwords.
>
> They all run inside your CI pipeline, / on every push.
> 🗣 *Say:* They all run inside your C-I pipeline, / on every push.
>
> A check fails? The merge is blocked, / until it's fixed.
>
> Dev. Sec. Ops. / One team, one pipeline.
>
> Next: SAST, scanning your code. / Follow for part two.
> 🗣 *Say:* Next: sast, scanning your code. / Follow for part two.

## Episode 22: SAST explained

*About 60 seconds · 110 words*

**Say it like this**

| Word | How to say it |
|---|---|
| security | si-KYOOR-i-tee |
| SAST | “sast” |
| static | STAT-ik |
| application | ap-li-KAY-shun |
| SQL | “sequel” |
| injection | in-JEK-shun |
| scanner | SKAN-er |
| semgrep | SEM-grep |
| --config | “dash dash config” |
| parameterized | puh-RAM-i-ter-ized |
| SCA | “S-C-A” |
| dependencies | di-PEN-dun-seez |

**Script**

> Can a tool find security bugs just by reading your code? / Yes. It's called SAST.
> 🗣 *Say:* Can a tool find security bugs just by reading your code? / Yes. It's called sast.
>
> Static Application Security Testing. / It scans your source code, without running it.
>
> Think of a spell-checker, / but for security mistakes.
>
> Here's a classic: / a SQL query glued together with user input. / That's SQL injection.
> 🗣 *Say:* Here's a classic: / a sequel query glued together with user input. / That's sequel injection.
>
> Run a scanner like Semgrep: / semgrep scan --config auto / It flags the exact line.
> 🗣 *Say:* Run a scanner like Semgrep: / semgrep scan dash dash config auto / It flags the exact line.
>
> The fix: a parameterized query. / Now the input can't change the SQL.
> 🗣 *Say:* The fix: a parameterized query. / Now the input can't change the sequel.
>
> SAST is fast, and runs on every pull request. / But it can raise false alarms, so review the findings.
> 🗣 *Say:* sast is fast, and runs on every pull request. / But it can raise false alarms, so review the findings.
>
> SAST: reads code, finds risky patterns, early.
> 🗣 *Say:* sast: reads code, finds risky patterns, early.
>
> Next: SCA, checking your dependencies. / Follow for part three.
> 🗣 *Say:* Next: S-C-A, checking your dependencies. / Follow for part three.

## Episode 23: SCA explained

*About 57 seconds · 99 words*

**Say it like this**

| Word | How to say it |
|---|---|
| libraries | LY-brer-eez |
| SCA | “S-C-A” |
| composition | kom-puh-ZISH-un |
| analysis | uh-NAL-i-sis |
| dependency | di-PEN-dun-see |
| vulnerabilities | vul-ner-uh-BIL-i-teez |
| ingredients | in-GREE-dee-unts |
| npm | en-pee-em |
| lodash | LOW-dash |
| 4.17.20 | “four point seventeen point twenty” |
| injection | in-JEK-shun |
| 4.17.21 | “four point seventeen point twenty-one” |
| SBOM | “ESS-bom” |
| ingredient | in-GREE-dee-unt |
| DAST | “dast” |

**Script**

> Most of your app is code you didn't write. / So who checks those libraries?
>
> SCA does. / Software Composition Analysis.
> 🗣 *Say:* S-C-A does. / Software Composition Analysis.
>
> It lists every dependency you use, / and compares them with known vulnerabilities.
>
> Like a product recall list, / for your ingredients.
>
> Try it now: npm audit / It found one: lodash 4.17.20, / a known command injection flaw.
> 🗣 *Say:* Try it now: npm audit / It found one: lodash four point seventeen point twenty, / a known command injection flaw.
>
> The fix is usually an upgrade. / npm audit fix / Now you're on 4.17.21. Patched.
> 🗣 *Say:* The fix is usually an upgrade. / npm audit fix / Now you're on four point seventeen point twenty-one. Patched.
>
> SCA can also build an SBOM, / a full ingredient list of your software.
> 🗣 *Say:* S-C-A can also build an ESS-bom, / a full ingredient list of your software.
>
> SCA: know what you ship, patch what's broken.
> 🗣 *Say:* S-C-A: know what you ship, patch what's broken.
>
> Next: DAST, attacking your running app. / Follow for part four.
> 🗣 *Say:* Next: dast, attacking your running app. / Follow for part four.

## Episode 24: DAST explained

*About 57 seconds · 107 words*

**Say it like this**

| Word | How to say it |
|---|---|
| DAST | “dast” |
| dynamic | dy-NAM-ik |
| application | ap-li-KAY-shun |
| security | si-KYOOR-i-tee |
| attacker | uh-TAK-er |
| SAST | “sast” |
| scanner | SKAN-er |
| OWASP | “OH-wasp” |
| zap-baseline.py | “zap baseline dot pie” |
| staging | STAY-jing |
| URL | “U-R-L” |
| header | HED-er |
| production | pruh-DUK-shun |
| secret | SEE-krit |
| scanning | SKAN-ing |

**Script**

> Your code scan is clean. / So is the running app safe? / Not yet.
>
> That's what DAST is for. / Dynamic Application Security Testing.
> 🗣 *Say:* That's what dast is for. / Dynamic Application Security Testing.
>
> It tests your app from the outside, while it's running, / just like an attacker would.
>
> SAST reads the recipe. / DAST tastes the dish.
> 🗣 *Say:* sast reads the recipe. / dast tastes the dish.
>
> Point a scanner like OWASP ZAP at a test site: / zap-baseline.py, dash t, then your staging URL.
> 🗣 *Say:* Point a scanner like OH-wasp ZAP at a test site: / zap baseline dot pie, dash t, then your staging U-R-L.
>
> It crawls your pages and sends tricky requests, / then reports what it found: / a missing security header, for example.
>
> Important: only scan apps you own, / and use staging, not production.
>
> DAST: test the running app, from the outside.
> 🗣 *Say:* dast: test the running app, from the outside.
>
> Next: secret scanning. / Follow for part five.

## Episode 25: Secret scanning explained

*About 58 seconds · 103 words*

**Say it like this**

| Word | How to say it |
|---|---|
| git | git (hard G, as in “give”) |
| secret | SEE-krit |
| scanning | SKAN-ing |
| API | “A-P-I” |
| repo | REE-poh |
| gitleaks | GIT-leeks |
| commit | kuh-MIT |
| rotate | ROH-tayt |
| environment | en-VY-run-ment |
| variable | VAIR-ee-uh-bul |
| protection | pruh-TEK-shun |
| secrets | SEE-krits |
| container | kun-TAY-ner |
| images | IM-ij-iz |

**Script**

> One pushed password can cost you everything. / And Git never forgets.
>
> Secret scanning catches keys and passwords in your code.
>
> It looks for patterns: / API keys, tokens, private keys.
> 🗣 *Say:* It looks for patterns: / A-P-I keys, tokens, private keys.
>
> Scan your repo with Gitleaks: / gitleaks detect / It checks every commit, not just the latest.
>
> Found one? Deleting the line is not enough. / It's still in your history.
>
> Rotate the key first. / Then move it to a secret store, or an environment variable.
>
> Best of all: block it before it's pushed, / with a pre-commit hook, or push protection.
>
> Scan, rotate, and keep secrets out of Git.
>
> Next: scanning container images. / Follow for part six.

## Episode 26: Container image scanning explained

*About 57 seconds · 94 words*

**Say it like this**

| Word | How to say it |
|---|---|
| docker | DOK-er |
| image | IM-ij |
| vulnerable | VUL-ner-uh-bul |
| scanning | SKAN-ing |
| libraries | LY-brer-eez |
| trivy | TRIV-ee |
| my-app:latest | “my app, colon, latest” |
| severity | suh-VAIR-i-tee |
| pipeline | PIPE-line |
| critical | KRIT-i-kul |
| DevSecOps | “dev-SEK-ops” |

**Script**

> Your Docker image has hundreds of packages inside. / Any one of them could be vulnerable.
>
> Image scanning checks them all.
>
> It reads every layer: / the base image, system packages, and your libraries.
>
> Scan it with Trivy: / trivy image my-app:latest / You get a list, sorted by severity.
> 🗣 *Say:* Scan it with Trivy: / trivy image my app, colon, latest / You get a list, sorted by severity.
>
> Fix one: use a small, up-to-date base image. / Fewer packages, fewer problems.
>
> Fix two: rebuild often, so patches get in.
>
> Then add the scan to your pipeline, / and fail the build on critical findings.
>
> Small base. Rebuild often. Scan every build.
>
> That's your DevSecOps toolkit! / Follow for more.
> 🗣 *Say:* That's your dev-SEK-ops toolkit! / Follow for more.

# Trending now

## Episode 27: Six days of outages

*About 58 seconds · 95 words*

**Say it like this**

| Word | How to say it |
|---|---|
| microsoft | MY-kroh-soft |
| FAA | “F-A-A” |
| AWS | “A-W-S” |
| outages | OW-tij-iz |
| 365 | “three sixty-five” |
| unstable | un-STAY-bul |
| equipment | i-KWIP-ment |
| coincidence | koh-IN-si-dens |
| dependencies | di-PEN-dun-seez |

**Script**

> Six days. Microsoft, the FAA, AWS, Chase, United, Apple. / All had outages.
> 🗣 *Say:* Six days. Microsoft, the F-A-A, A-W-S, Chase, United, Apple. / All had outages.
>
> It started November 12, with Microsoft 365. / Then flights were grounded. / Then AWS, Chase, United, and Apple.
> 🗣 *Say:* It started November 12, with Microsoft three sixty-five. / Then flights were grounded. / Then A-W-S, Chase, United, and Apple.
>
> So was it one giant cyber attack? / Officials say there is no evidence of that.
>
> The reported causes are all different: / a hidden bug, unstable old equipment, an internal update.
>
> So why all at once? / Partly coincidence. Partly, everything is connected.
>
> The lesson for engineers: assume your dependencies will fail. / And plan for it.
>
> Outages aren't rare. Being ready is.
>
> If this helped, / follow for more.

## Episode 28: What broke Microsoft 365

*About 61 seconds · 106 words*

**Say it like this**

| Word | How to say it |
|---|---|
| microsoft | MY-kroh-soft |
| gateway | GATE-way |
| overloaded | oh-ver-LOH-did |
| 80 | “eighty” |
| cascading | kas-KAY-ding |
| capacity | kuh-PAS-i-tee |
| headroom | HED-room |

**Script**

> November 12. Outlook and Teams went down, / for about a day.
>
> Microsoft's early report describes three things at once.
>
> One: a hidden bug that froze gateway servers under heavy load.
>
> Two: about 14 percent of those servers were already offline.
>
> Three: Teams traffic had been moved onto them hours earlier.
>
> Then the safety system kicked in. / It moved traffic to the healthy servers, / and overloaded them too.
>
> At the worst point, over 80 percent had stopped responding.
> 🗣 *Say:* At the worst point, over eighty percent had stopped responding.
>
> That's a cascading failure. / The fix: spare capacity, and shed load before servers fall over.
>
> Leave headroom. Fail small, not all at once.
>
> If this helped, / follow for more.

## Episode 29: Why every US flight stopped

*About 56 seconds · 102 words*

**Say it like this**

| Word | How to say it |
|---|---|
| US | “U-S” |
| FAA | “F-A-A” |
| equipment | i-KWIP-ment |
| unstable | un-STAY-bul |
| cyberattack | SY-ber-uh-tak |
| investigated | in-VES-ti-gay-tid |
| unprotected | un-pruh-TEK-tid |

**Script**

> November 13. Every departure in the US, stopped. / For more than four hours.
> 🗣 *Say:* November 13. Every departure in the U-S, stopped. / For more than four hours.
>
> It's called a ground stop. / Planes in the air keep flying. Nothing new takes off.
>
> The FAA points to its old network equipment: / it became unstable under too much traffic.
> 🗣 *Say:* The F-A-A points to its old network equipment: / it became unstable under too much traffic.
>
> Officials say there's no evidence of a cyberattack. / The root cause is still being investigated.
>
> Old systems are the hard part. / They work for decades, until the load changes.
>
> The lesson: protect old systems from traffic floods. / Use rate limits, and test changes on a copy first.
>
> Old isn't the problem. Unprotected is.
>
> If this helped, / follow for more.

## Episode 30: Java4Shell explained

*About 62 seconds · 125 words*

**Say it like this**

| Word | How to say it |
|---|---|
| Java4Shell | “java-for-shell” |
| AI | “A-I” |
| OpenJDK | “open J-D-K” |
| Base64 | “base sixty-four” |
| decoder | dee-KOH-der |
| attacker | uh-TAK-er |
| exploit | EKS-ployt |
| SCA | “S-C-A” |
| SBOM | “ESS-bom” |

**Script**

> A new Java bug has a scary name: Java4Shell. / And an AI helped find it.
> 🗣 *Say:* A new Java bug has a scary name: java-for-shell. / And an A-I helped find it.
>
> It's in OpenJDK, the engine that runs most Java apps.
> 🗣 *Say:* It's in open J-D-K, the engine that runs most Java apps.
>
> The bug hides in a tiny, speed-tuned piece of code: / the Base64 decoder.
> 🗣 *Say:* The bug hides in a tiny, speed-tuned piece of code: / the base sixty-four decoder.
>
> Feed it the wrong data, and it corrupts memory. / That can let an attacker run code.
>
> The twist: the research firm says it took about an hour to find, / using an AI coding tool.
> 🗣 *Say:* The twist: the research firm says it took about an hour to find, / using an A-I coding tool.
>
> Good news: it's hard to exploit, / and no attacks have been reported so far.
>
> Oracle shipped a fix on November 17. / Update to your Java vendor's patched build.
>
> Don't know which Java you run? / That's what SCA and an SBOM are for.
> 🗣 *Say:* Don't know which Java you run? / That's what S-C-A and an ESS-bom are for.
>
> Find it. Patch it. Fast.
>
> If this helped, / follow for more.

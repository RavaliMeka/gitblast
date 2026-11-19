# Writes the Linux series and builds it in the house style. Folders 31-36 are shown as episodes 27-32
# (the four special topics in folders 27-30 carry no episode number).
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__)); root = os.path.join(here, "..", ".."); LIB = open(os.path.join(here, "lib.js")).read()
def hl(c, w): return '<hl c="%s">%s</hl>' % (c, w)
def scene(t, title, pose, cap, prop, step=None):
    pose = pose if isinstance(pose, list) else [[0, pose]]
    return "  { t: %s, %stitle: %s, pose: %s, mood: \"happy\",\n    cap: %s, prop: %s }," % (t, "step: %d, " % step if step else "", json.dumps(title), json.dumps(pose), json.dumps(cap), json.dumps(prop))
EPS = {}
TL = 'const TL = "#0d9488";\n'

EPS["31-linux-intro"] = dict(title="What is Linux?", keys="internet free linux open-source kernel hardware distros ubuntu stable automate terminal commands whoami docker kubernetes easier".split(), end=56, scenes=[
  (0, "What runs the " + hl("blue", "internet") + "?", "shrug", [[0, "Most of the internet runs on one operating system."], [3.6, "And it's free."]], "runs"),
  (6.6, "Meet " + hl("green", "Linux"), "present", [[0, "It's called Linux."], [1.8, "An open-source system that anyone can use."]], "hero"),
  (12.6, "The " + hl("blue", "kernel"), "point", [[0, "At its heart is the kernel,"], [2.2, "the part that talks to your hardware."]], "kernel", 1),
  (18.8, "Many " + hl("amber", "flavors"), "present", [[0, "Linux comes in flavors, called distros:"], [3.2, "Ubuntu, Debian, Fedora, and many more."]], "distros"),
  (25.8, "Why DevOps " + hl("green", "loves") + " it", "point", [[0, "Why does DevOps love it?"], [2.2, "It's free, stable, and easy to automate."]], "why", 2),
  (32.6, "The " + hl("blue", "terminal"), "point", [[0, "You control it by typing commands in the terminal."], [4, "Try one: whoami"]], "term"),
  (40, "It's " + hl("green", "everywhere"), "present", [[0, "Docker, Kubernetes, the cloud:"], [2.6, "they all run on Linux."]], "all", 3),
  (46.2, "Start " + hl("green", "here"), "thumb", [[0, "Learn Linux, and everything else gets easier."]], "recap"),
  (50.4, "Next: " + hl("blue", "commands"), "present", [[0, "Next: moving around with commands."], [2.8, "Follow for part two."]], "next"),
], props=TL + '''
const P = {
  runs: lt => svg(bullets(lt, [[.3, "✓", "web servers", TL], [1, "✓", "the cloud", TL], [1.7, "✓", "Android phones", TL], [2.4, "✓", "supercomputers", TL]], 10, 104), 440),
  hero: lt => svg(titleCard(lt, "Linux", "free and open source", TL), 420),
  kernel: lt => svg(stack(lt, [["your apps", DS.blue], ["the shell", DS.amber, "where you type"], ["the kernel", TL, "the core"], ["hardware", DS.ink, "CPU · memory · disk"]]), 420),
  distros: lt => svg(bullets(lt, [[3.2, "1", "Ubuntu", DS.amber], [4, "2", "Debian", DS.red], [4.8, "3", "Fedora", DS.blue]], 10, 108), 350),
  why: lt => svg(bullets(lt, [[2.2, "1", "free", TL], [3, "2", "stable", DS.blue], [3.8, "3", "easy to automate", DS.amber]], 10, 108), 350),
  term: lt => svg(shell(lt, [[4, "$ whoami"], [5.6, "dev", "#86efac"]]) + T(320, 190, "it answers with your user name", DS.mute, 21, 700, "middle", MONO, (lt - 6) / .3), 230),
  all: lt => svg(stack(lt, [["Docker", DS.blue], ["Kubernetes", "#3d5afe"], ["the cloud", DS.amber], ["Linux", TL, "underneath it all"]]), 420),
  recap: lt => svg(recap(lt, [["Kernel", "the core", TL], ["Distro", "your flavor", DS.amber], ["Terminal", "how you drive it", DS.blue]]), 450),
  next: lt => svg(nextCard(lt, "Part 2", "Moving around", 2.8), 450),
};''')

EPS["32-linux-navigation"] = dict(title="Linux: moving around", keys="lost three pwd where ls here details cd folder back mkdir touch careful rm deletes good never".split(), end=58, scenes=[
  (0, hl("red", "Lost") + " in the terminal?", "shrug", [[0, "A black screen and a blinking cursor."], [3, "Where are you? What's here?"]], "blank"),
  (6.6, "Three " + hl("blue", "commands"), "present", [[0, "Three commands answer that."]], "three"),
  (10.2, "Where am " + hl("blue", "I") + "?", "point", [[0, "pwd shows where you are."], [2.6, "It stands for print working directory."]], "pwd", 1),
  (17.2, "What's " + hl("blue", "here") + "?", "point", [[0, "ls lists what's here."], [2.4, "Add -l for details."]], "ls"),
  (24.2, "Move " + hl("green", "around"), "point", [[0, "cd moves you into a folder."], [2.8, "cd .. takes you back up."]], "cd", 2),
  (32.4, "Make " + hl("green", "things"), "point", [[0, "Make a folder with mkdir."], [2.6, "Make an empty file with touch."]], "make"),
  (40.2, "Careful: " + hl("red", "rm"), "shrug", [[0, "Careful with rm."], [1.8, "It deletes for good. There's no recycle bin."]], "rm", 3),
  (47.6, "Never " + hl("green", "lost"), "thumb", [[0, "pwd. ls. cd. You're never lost again."]], "recap"),
  (52.2, "Next: " + hl("blue", "files"), "present", [[0, "Next: reading and searching files."], [2.8, "Follow for part three."]], "next"),
], props=TL + '''
const P = {
  blank: lt => svg(shell(lt, [[.2, "$ " + (Math.floor(lt * 2) % 2 ? "▌" : "")], [1, " "], [1, " "]]) + T(320, 250, "where am I?", DS.mute, 26, 800, "middle", SANS, (lt - 3) / .3), 290),
  three: lt => svg(bullets(lt, [[.3, "pwd", "where am I?", TL], [.9, "ls", "what's here?", DS.blue], [1.5, "cd", "go somewhere", DS.amber]], 10, 108), 350),
  pwd: lt => svg(shell(lt, [[.3, "$ pwd"], [1.6, "/home/dev", "#86efac"]]) + T(320, 190, "print working directory", DS.mute, 22, 700, "middle", MONO, (lt - 2.8) / .3), 230),
  ls: lt => svg(shell(lt, [[.3, "$ ls"], [1.4, "notes.txt  projects", "#86efac"], [2.6, "$ ls -l"], [4, "-rw-r--r-- dev  notes.txt", "#86efac"], [4.3, "drwxr-xr-x dev  projects", "#86efac"]]), 290),
  cd: lt => svg(shell(lt, [[.3, "$ cd projects"], [1.6, "$ pwd"], [2.4, "/home/dev/projects", "#86efac"], [3.2, "$ cd .."], [4.6, "$ pwd"], [5.4, "/home/dev", "#86efac"]]), 330),
  make: lt => svg(shell(lt, [[.3, "$ mkdir demo"], [2.8, "$ touch demo/app.txt"], [4.6, "$ ls demo"], [5.6, "app.txt", "#86efac"]]), 250),
  rm: lt => svg(shell(lt, [[.3, "$ rm demo/app.txt"]]) + G(lt, 2, 320, 200, box(-250, -52, 500, 104, DS.red, "#fff1f3", 18) + T(0, 12, "gone for good · no undo", DS.red, 28, 800)), 280),
  recap: lt => svg(recap(lt, [["pwd", "where am I", TL], ["ls", "what's here", DS.blue], ["cd", "go there", DS.amber]]), 450),
  next: lt => svg(nextCard(lt, "Part 3", "Reading and searching files", 2.8), 450),
};''')

EPS["33-linux-files"] = dict(title="Linux: reading and searching files", keys="thousand error four cat whole short tail end newest grep searches pipe join live follows hunting".split(), end=56, scenes=[
  (0, "Ten thousand " + hl("red", "lines"), "shrug", [[0, "A log file with ten thousand lines."], [3, "How do you find the one error?"]], "log"),
  (6.6, "Four small " + hl("blue", "commands"), "present", [[0, "Four small commands do it."]], "four"),
  (10.2, "Print it: " + hl("blue", "cat"), "point", [[0, "cat prints a whole file."], [2.4, "Great for short ones."]], "cat", 1),
  (16, "The end: " + hl("blue", "tail"), "point", [[0, "tail shows the end of a file,"], [2.6, "where the newest log lines are."]], "tail"),
  (23.2, "Search: " + hl("green", "grep"), "point", [[0, "grep searches for a word."], [2.4, "grep error app.log"]], "grep", 2),
  (31, "Join them: the " + hl("amber", "pipe"), [[0, "point"], [6, "cheer"]], [[0, "Now join them with a pipe."], [2.6, "tail the file, then grep the result."], [6, "Found it!"]], "pipe", 3),
  (40.4, "Watch it " + hl("green", "live"), "point", [[0, "Want it live?"], [1.6, "tail -f follows the file as it grows."]], "live"),
  (46.6, "Log " + hl("green", "hunting"), "thumb", [[0, "cat, tail, grep, pipe. That's log hunting."]], "recap"),
  (51, "Next: " + hl("blue", "permissions"), "present", [[0, "Next: file permissions."], [2.2, "Follow for part four."]], "next"),
], props=TL + '''
const P = {
  log: lt => svg(shell(lt, [[.1, "12:01 info  request ok", "#94a3b8"], [.3, "12:02 info  request ok", "#94a3b8"], [.5, "12:03 info  request ok", "#94a3b8"], [.7, "12:04 info  request ok", "#94a3b8"], [.9, "…10,000 more lines", "#64748b"]]) + T(320, 320, "where is the error?", DS.red, 26, 800, "middle", SANS, (lt - 3) / .3), 350),
  four: lt => svg(bullets(lt, [[.2, "cat", "print a file", TL], [.7, "tail", "show the end", DS.blue], [1.2, "grep", "search for a word", DS.amber], [1.7, "|", "join commands", DS.ink]], 10, 104), 440),
  cat: lt => svg(shell(lt, [[.3, "$ cat notes.txt"], [1.6, "buy milk", "#86efac"], [1.8, "call the bank", "#86efac"]]), 200),
  tail: lt => svg(shell(lt, [[.3, "$ tail -n 3 app.log"], [2, "12:03 info  request ok", "#94a3b8"], [2.2, "12:04 error db timeout", "#fda4af"], [2.4, "12:05 info  request ok", "#94a3b8"]]) + T(320, 250, "-n 3 = the last three lines", DS.mute, 21, 700, "middle", MONO, (lt - 3.4) / .3), 290),
  grep: lt => svg(shell(lt, [[2.4, "$ grep error app.log"], [4.4, "12:04 error db timeout", "#fda4af"]]) + T(320, 190, "only the matching lines", DS.mute, 21, 700, "middle", MONO, (lt - 5.2) / .3), 230),
  pipe: lt => svg(shell(lt, [[2.6, "$ tail -n 100 app.log | grep error"], [5.4, "12:04 error db timeout", "#fda4af"]]) + stages(lt, ["tail", "|", "grep"], 250, .4, [], .5) + T(320, 340, "output of one → input of the next", DS.mute, 21, 700, "middle", MONO, (lt - 3.4) / .3), 380),
  live: lt => svg(shell(lt, [[1.6, "$ tail -f app.log"], [3.2, "12:06 info  request ok", "#94a3b8"], [4, "12:07 info  request ok", "#94a3b8"], [4.8, "12:08 error db timeout", "#fda4af"]]), 250),
  recap: lt => svg(recap(lt, [["cat", "print it", TL], ["tail", "see the end", DS.blue], ["grep", "search it", DS.amber]]), 450),
  next: lt => svg(nextCard(lt, "Part 4", "File permissions", 2.2), 450),
};''')

EPS["34-linux-permissions"] = dict(title="Linux: file permissions", keys="denied wall owner rules read write run three group everyone chmod runnable works sudo admin twice others".split(), end=58.5, scenes=[
  (0, "Permission " + hl("red", "denied"), "shrug", [[0, "Permission denied."], [1.8, "Every Linux user hits this wall."]], "denied"),
  (6, "Owner and " + hl("blue", "rules"), "present", [[0, "Every file has an owner, and rules."]], "owner"),
  (10.4, "Read the " + hl("blue", "rules"), "point", [[0, "Run ls -l to see them."], [2.8, "r is read. w is write. x is run."]], "lsl", 1),
  (19.4, "Three " + hl("amber", "groups"), "point", [[0, "The rules come in three groups:"], [2.6, "the owner, the group, and everyone else."]], "groups"),
  (26.8, "Change them: " + hl("green", "chmod"), "point", [[0, "chmod changes the rules."], [2.4, "chmod +x makes a file runnable."]], "chmod", 2),
  (34.6, "Try " + hl("green", "again"), [[0, "point"], [2, "cheer"]], [[0, "Run it again..."], [2, "it works!"]], "works"),
  (40.2, "The admin: " + hl("red", "sudo"), "shrug", [[0, "sudo runs one command as the admin."], [3.2, "Powerful. So read it twice before you press enter."]], "sudo", 3),
  (48.6, "Remember " + hl("green", "this"), "thumb", [[0, "Read, write, run. Owner, group, others."]], "recap"),
  (53, "Next: " + hl("blue", "processes"), "present", [[0, "Next: processes and ports."], [2.6, "Follow for part five."]], "next"),
], props=TL + '''
const trio = (lt, d0, vals) => [["owner", TL], ["group", DS.blue], ["others", DS.amber]].map(([n, c], i) => G(lt, d0 + i * .5, 120 + i * 200, 150, box(-85, -80, 170, 160, c, "#fff", 18) + T(0, -4, vals[i], c, 44, 800, "middle", MONO) + T(0, 44, n, DS.ink, 22, 700))).join("");
const P = {
  denied: lt => svg(shell(lt, [[.3, "$ ./deploy.sh"], [1.6, "bash: ./deploy.sh: Permission denied", "#fda4af"]]), 160),
  owner: lt => svg(bullets(lt, [[.3, "who", "an owner and a group", TL], [1.6, "what", "read · write · run", DS.blue]], 30, 120), 300),
  lsl: lt => svg(shell(lt, [[.3, "$ ls -l deploy.sh"], [1.8, "-rw-r--r-- dev dev deploy.sh", "#86efac"]]) + bullets(lt, [[2.8, "r", "read", TL], [3.6, "w", "write", DS.blue], [4.4, "x", "run (execute)", DS.amber]], 150, 92), 450),
  groups: lt => svg(trio(lt, 2.6, ["rw-", "r--", "r--"]) + T(320, 290, "-rw-r--r--", DS.ink, 34, 700, "middle", MONO, (lt - .4) / .3), 330),
  chmod: lt => svg(shell(lt, [[2.4, "$ chmod +x deploy.sh"], [4.2, "$ ls -l deploy.sh"], [5.4, "-rwxr-xr-x dev dev deploy.sh", "#86efac"]]) + T(320, 230, "x added: it can run now", TL, 23, 800, "middle", SANS, (lt - 6) / .3), 270),
  works: lt => svg(shell(lt, [[.3, "$ ./deploy.sh"], [2, "deployed ✓", "#86efac"]]), 160),
  sudo: lt => svg(shell(lt, [[.3, "$ sudo apt update"]]) + G(lt, 3.2, 320, 200, box(-250, -52, 500, 104, DS.amber, "#fffbeb", 18) + T(0, 12, "admin power: read it twice", "#b45309", 27, 800)), 280),
  recap: lt => svg(recap(lt, [["r w x", "read · write · run", TL], ["3 groups", "owner · group · others", DS.blue], ["chmod", "changes the rules", DS.amber]]), 450),
  next: lt => svg(nextCard(lt, "Part 5", "Processes and ports", 2.6), 450),
};''')

EPS["35-linux-processes"] = dict(title="Linux: processes and ports", keys="port use running process id ps top live holds ss kill stop nicely forces last services systemctl healthy".split(), end=58, scenes=[
  (0, "Port already in " + hl("red", "use"), "shrug", [[0, "Port already in use."], [2, "Something is running. But what?"]], "inuse"),
  (6.6, "Meet the " + hl("blue", "process"), "present", [[0, "Every running program is a process, with an ID."]], "proc"),
  (11.6, "List them: " + hl("blue", "ps"), "point", [[0, "ps aux lists them all."], [2.6, "top shows them live, busiest first."]], "ps", 1),
  (19.2, "Who holds the " + hl("amber", "port") + "?", "point", [[0, "To see who holds a port,"], [2.2, "run ss -tlnp"]], "ss", 2),
  (27.4, "Stop it: " + hl("red", "kill"), "point", [[0, "Then stop it: kill, and the process ID."]], "kill"),
  (33, "Be " + hl("green", "gentle"), "present", [[0, "kill asks nicely first."], [2.2, "kill -9 forces it. Use that last."]], "gentle"),
  (40.2, "Long-running " + hl("blue", "services"), "point", [[0, "Long-running apps are called services."], [3, "systemctl status shows if one is healthy."]], "svc", 3),
  (48.4, "Remember " + hl("green", "this"), "thumb", [[0, "Find it. Check the port. Stop it."]], "recap"),
  (52.4, "Next: " + hl("blue", "SSH"), "present", [[0, "Next: SSH, logging in to servers."], [2.8, "Follow for part six."]], "next"),
], props=TL + '''
const P = {
  inuse: lt => svg(shell(lt, [[.3, "$ node app.js"], [1.4, "Error: address already in use :::3000", "#fda4af"]]) + T(320, 190, "who has port 3000?", DS.red, 26, 800, "middle", SANS, (lt - 2.2) / .3), 230),
  proc: lt => svg([["node", 4312], ["nginx", 812], ["sshd", 640]].map(([n, id], i) => G(lt, .3 + i * .4, 120 + i * 200, 140, box(-85, -70, 170, 140, TL, "#fff", 18) + T(0, -4, n, DS.ink, 28, 800, "middle", MONO) + T(0, 36, "PID " + id, TL, 20, 700, "middle", MONO))).join(""), 260),
  ps: lt => svg(shell(lt, [[.3, "$ ps aux | grep node"], [1.8, "dev   4312  node app.js", "#86efac"], [3.2, "$ top"], [4.4, "PID   %CPU  COMMAND", "#94a3b8"], [4.6, "4312  42.0  node", "#fcd34d"]]), 290),
  ss: lt => svg(shell(lt, [[2.2, "$ ss -tlnp"], [4.2, "LISTEN  *:3000  node (pid=4312)", "#86efac"]]) + T(320, 190, "port 3000 → process 4312", TL, 24, 800, "middle", SANS, (lt - 5.2) / .3), 230),
  kill: lt => svg(shell(lt, [[.6, "$ kill 4312"], [2.8, "$ node app.js"], [4, "listening on :3000", "#86efac"]]), 200),
  gentle: lt => svg(compare(lt, { title: "kill", lines: ["asks politely", "app can clean up", "try this first"], col: TL, last: 1 }, { title: "kill -9", lines: ["forces it", "no clean-up", "last resort"], col: DS.red, last: 1, d: 2.2 }, 30, 290), 370),
  svc: lt => svg(shell(lt, [[3, "$ systemctl status nginx"], [5, "● nginx.service", "#86efac"], [5.4, "  Active: active (running)", "#86efac"]]), 200),
  recap: lt => svg(recap(lt, [["ps", "find the process", TL], ["ss", "check the port", DS.blue], ["kill", "stop it", DS.red]]), 450),
  next: lt => svg(nextCard(lt, "Part 6", "SSH: log in to servers", 2.8), 450),
};''')

EPS["36-linux-ssh"] = dict(title="Linux: SSH", keys="another country ssh secure shell address encrypted guessed keys safer ssh-keygen private never public server copy scp guard kit".split(), end=56, scenes=[
  (0, "A server far " + hl("blue", "away"), "shrug", [[0, "Your server is in another country."], [3, "How do you type commands on it?"]], "far"),
  (6.4, "Use " + hl("green", "SSH"), "present", [[0, "With SSH: Secure Shell."]], "hero"),
  (10.4, "Log " + hl("green", "in"), [[0, "point"], [5.4, "cheer"]], [[0, "Type ssh, your user name, at, the server's address."], [5.4, "You're in!"]], "login", 1),
  (18.4, "It's " + hl("blue", "encrypted"), "present", [[0, "Everything you type travels encrypted."]], "enc"),
  (23, "Keys beat " + hl("red", "passwords"), "point", [[0, "Passwords can be guessed. Keys are safer."], [3.4, "Make a pair with ssh-keygen."]], "keygen", 2),
  (31, "Two " + hl("amber", "keys"), "point", [[0, "The private key stays with you. Never share it."], [4, "The public key goes on the server."]], "two"),
  (39.6, "Copy a " + hl("blue", "file"), "point", [[0, "Need to copy a file? Use scp."]], "scp", 3),
  (45.6, "Remember " + hl("green", "this"), "thumb", [[0, "ssh in. Use keys. Guard the private one."]], "recap"),
  (50, "Your Linux " + hl("green", "starter kit"), "present", [[0, "That's your Linux starter kit!"], [2.6, "Follow for more."]], "done"),
], props=TL + '''
const P = {
  far: lt => svg(G(lt, .2, 130, 150, box(-100, -70, 200, 140, DS.ink, "#fff", 18) + T(0, 10, "you", DS.ink, 32, 800)) + G(lt, .8, 510, 150, box(-100, -70, 200, 140, TL, "#fff", 18) + T(0, -2, "server", TL, 30, 800) + T(0, 32, "far away", DS.mute, 19, 600, "middle", MONO)) +
    `<path d="M236 150 H404" stroke="${DS.mute}" stroke-width="5" stroke-dasharray="9 9" opacity="${clamp((lt - 1.4) / .3)}"/>` + T(320, 140, "?", DS.red, 48, 800, "middle", SANS, (lt - 3) / .3), 270),
  hero: lt => svg(titleCard(lt, "SSH", "Secure Shell", TL), 420),
  login: lt => svg(shell(lt, [[.4, "$ ssh dev@203.0.113.10"], [5.4, "Welcome to Ubuntu", "#86efac"], [6, "dev@server:~$", "#e2e8f0"]]) + T(320, 230, "user @ address", DS.mute, 22, 700, "middle", MONO, (lt - 3) / .3), 270),
  enc: lt => svg(stages(lt, ["you", "🔒 encrypted", "server"], 120, .2, [], .5) + T(320, 230, "nobody in between can read it", TL, 23, 800, "middle", SANS, (lt - 2) / .3), 270),
  keygen: lt => svg(shell(lt, [[3.4, "$ ssh-keygen -t ed25519"], [5.6, "Your key pair has been saved", "#86efac"]]), 160),
  two: lt => svg(compare(lt, { title: "private key", lines: ["stays on your laptop", "never share it", "🔑"], col: DS.red }, { title: "public key", lines: ["goes on the server", "safe to share", "🔓"], col: TL, d: 4 }, 30, 290), 370),
  scp: lt => svg(shell(lt, [[.6, "$ scp app.zip dev@203.0.113.10:/home/dev/"], [3.6, "app.zip   100%", "#86efac"]]), 160),
  recap: lt => svg(recap(lt, [["ssh", "log in", TL], ["keys", "not passwords", DS.blue], ["private", "never share", DS.red]]), 450),
  done: lt => svg(bullets(lt, [[.2, "1", "what Linux is", TL], [.5, "2", "moving around", TL], [.8, "3", "reading files", TL], [1.1, "4", "permissions", TL], [1.4, "5", "processes", TL], [1.7, "6", "SSH", TL]], 0, 78) + G(lt, 2.6, 320, 530, `<rect x="-180" y="-46" width="360" height="92" rx="46" fill="${DS.red}"/>` + T(0, 13, "+ Follow", "#fff", 38, 800)), 590),
};''')

for name, e in EPS.items():
    d = os.path.join(root, name); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "scenes.js"), "w").write("const S = [\n" + "\n".join(scene(*s) for s in e["scenes"]) + "\n];\nlet END = %s;\n" % e["end"])
    for f in ("scenes.js.orig", "house.json"):
        if os.path.exists(os.path.join(d, f)): os.remove(os.path.join(d, f))
    open(os.path.join(d, "props.js"), "w").write(LIB + e["props"] + "\n")
    json.dump({"title": e["title"], "meta": "ep.%02d · %s" % (int(name[:2]) - 4, name[3:].replace("-", " "))}, open(os.path.join(d, "house.json"), "w"), indent=2) if False else json.dump({"title": e["title"], "meta": "ep.%02d · %s" % (int(name[:2]) - 4, name[3:].replace("-", " ")), "keys": e["keys"]}, open(os.path.join(d, "house.json"), "w"), indent=2)
    subprocess.check_call([sys.executable, os.path.join(here, "..", "convert_house.py"), d])

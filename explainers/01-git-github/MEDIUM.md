# Git vs GitHub: the 60-second explanation I wish I'd had

*Subtitle: They are not the same thing, and once you see the difference, your first repo takes five commands.*

When I started, I used "Git" and "GitHub" as if they were one word. Most beginners do. They are two different things that happen to work well together, and mixing them up makes every tutorial harder than it needs to be.

Here is the short version.

## Git is a save system for your code

Think of a save point in a game. Before the boss fight, you save. If it goes badly, you load the save and try again.

Git does that for code. Every time you reach a point worth keeping, you make a save point, called a **commit**. Broke something an hour later? Go back to an older version.

Two things surprise people:

- Git lives on your own laptop.
- It doesn't need the internet at all.

## GitHub is an online home for that code

GitHub is a website that stores a copy of your Git project. It gives you three things your laptop can't:

- **Backup:** your laptop can die; your code survives.
- **Sharing:** anyone you choose can see it.
- **Teamwork:** several people can work on the same project.

## The one line to remember

**Git is the camera. GitHub is Instagram.**

The camera takes the pictures and works fine with no signal. Instagram is where you put them so other people can see them.

## Your first repo in five commands

Make a folder for your project, open a terminal inside it, and run these.

**1. Start Git in the folder**

```bash
git init
```

**2. Pick the files to save**

```bash
git add .
```

**3. Make save point number one**

```bash
git commit -m "first commit"
```

Now go to GitHub, click **New repository**, and give it the same name as your folder. GitHub will show you an address for it. Then:

**4. Tell Git where the online copy lives**

```bash
git remote add origin https://github.com/YOUR-NAME/YOUR-REPO.git
```

**5. Send your code up**

```bash
git push -u origin main
```

Refresh the GitHub page. Your code is live.

## The whole thing in four words

**init, add, commit, push.**

- `init` starts tracking.
- `add` chooses what to save.
- `commit` saves it.
- `push` sends it to GitHub.

## Watch it instead

I made a 60-second animated version of this, with the commands on screen:

**[paste your Instagram reel link here]**

Next in the series is **branches**: how to try a new feature without breaking the code that already works.

If this cleared something up for you, follow me here and on Instagram at [@dnimbus.ai](https://www.instagram.com/dnimbus.ai) for one DevOps idea at a time.

---

**Tags to add on Medium (it allows five):** Git, GitHub, DevOps, Programming, Beginners

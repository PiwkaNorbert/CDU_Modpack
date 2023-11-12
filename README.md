# CDU Voter

After you clone the repo from:

```sh
git clone https://github.com/PiwkaNorbert/CDU_Modpack.git
```
## 🧞 Commands

All commands are run from the root of the project and run the following commands in this order from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run build`           | Build your production site to `./dist/`          |


This should generate a folder called './dist/' and in this folder you will have all content of the site.

Place the content of the './dist/' folder into your `nginx` and it should work


## How to change the ip of the backend 

Inside of the project folder, create a text file with the name .env `that should be the file type`.

Add `VITE_NODE_ENV = "production"`


```text
/
├── public/
├── src/
│   └── Constants.tsx/

```
Next change export const apiBase = isDev ? "https://www.trainjumper.com" : isProd ? "`to your desired ip adress`" : "";

# emoji-selector
A HTML custom element implementing the `<emoji-selector>` tag.

![emoji-selector in action](https://github.com/Kiricon/emoji-selector/raw/master/capture.gif)

## Setup

### Installation
```
npm i emoji-selector
```

---

```Html
<script src="node_modules/emoji-selector/emoji-selector.bundle.js"></script>
```
or if you're bundling
```Javascript
import "emoji-selector";
// or
require("emoji-selector");
```


## Usage
```HTML
    <emoji-selector></emoji-selector>
    <script>
        let emojiSelector = document.querySelector('emoji-selector');

        // You can assign a function to "emojiSelected"
        // that will will be called every time an emoji is select
        emojiSelector.emojiSelected = (char) => {
            console.log(char);
            emojiSelector.close();
        };
    </script>
```
# canvas-webgl-shaders
frontend masters 2d and 3d creative art coding tutorial..

- __creative coding__: using code to create something expressive rather than functional

- __generative art__: artworks created in part by autonomous or rule based system

```bash
# installing canva cli
npm i canvas-sketch-cli

# running existing canva
canvas-sketch sketch.js

# creating new canva and opening it in browser
canvas-sketch sketch.js --new --open
```

THREEJS
- __material__: surface quality of a mesh.
    - _mesh-basic-material_ :- no lighting
    - _mesh-normal-material_ :- for debugging purpose
    - _mesh-standard-material_ :- with light, shadding and shadows (more of real life) [smoth shadded, flat shadded]
- __geometry__: the actual topology (sphere, box)
- __mesh__: wrapper of material and geometry, (eg: creating one geometry, but reusing it using different mesh)
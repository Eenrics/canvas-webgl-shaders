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

# creating new threejs canva for 3D
canvas-sketch webgl.js --new --template=three

# run canvas sketch with ability to download to specific folder
canvas-sketch webgl.js --output=tmp/

# create a video from picture with ffpng
canvas-sketch-mp4 tmp/
```

THREEJS
- __material__: surface quality of a mesh.
    - _mesh-basic-material_ :- no lighting
    - _mesh-normal-material_ :- for debugging purpose
    - _mesh-standard-material/mesh-physical-material_ :- with light, shadding and shadows (more of real life) [smoth shadded, flat shadded]
- __geometry__: the actual topology (sphere, box)
- __mesh__: wrapper of material and geometry, (eg: creating one geometry, but reusing it using different mesh)
- __scene__: meshes combined
- __camera__: virtual way of looking at the world
    - _perspective-camera_ :- we are seeing two point perspectives
    - _orthographic-camera_ :- everthing looks flat and two dimentional (for 2D)
- __animation__: 
- __shadder__: small program that is meant to do a single task really well. _(It is made using glsl programming language)_
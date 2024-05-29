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

# creating new shader canva 
canvas-sketch shader.js --new --template=shader

# run canvas sketch with hot reload 
canvas-sketch shader.js --hot
  
# create new penplotter canvas sketch
canvas-sketch penplotter.js --new --template=penplot
  
```

THREEJS
- __material__: surface quality of a mesh.
    - _mesh-basic-material_ :- no lighting
    - _mesh-normal-material_ :- for debugging purpose
    - _mesh-standard-material/mesh-physical-material_ :- with light, shadding and shadows (more of real life) [smoth shadded, flat shadded]
    - _shader-material_ :- you don't have to write precision etc.. threejs do it for you.
    - _raw-shader-material_ :- if you don't want threejs shader and implement the shader from scratch.
- __geometry__: the actual topology (sphere, box)
- __mesh__: wrapper of material and geometry, (eg: creating one geometry, but reusing it using different mesh)
- __scene__: meshes combined
- __camera__: virtual way of looking at the world
    - _perspective-camera_ :- we are seeing two point perspectives
    - _orthographic-camera_ :- everthing looks flat and two dimentional (for 2D)
- __animation__: 
- __shadder__: small program that is meant to do a single task really well. _(It is made using glsl programming language [shadder language for webgl])_
    - example :-
    ```glsl
    // Default floating point precision
    precision highp float;

    //  Inputs
    varying vec2 vUv;

    // Variables from JavaScript
    uniform float time;

    // Main function
    void main () {
        // Output color
        gl_FragColor = vec4(1.0);
    }
    ```
    > `highp`: high precision,
    > `vec2`: 2 dimentional vector or coordinate
    - shdder runs on a pixel but does not know anything about the next pixel
    - there are two types of varibles in shadder :- 
        1. _varying_: coordinate, number or a value that is coming from webgl. It is called varying because as it moves across the surface, it is varying. They are set by vertex shader.
        2. _uniform_: it is called uniform because its value is uniform across all pixels. They are set by javascript.
    - two vscode extension useful for syntax highlight for shaders :-
        - shader languages support
        - comment tagged template
    - FragColor is a rgba value
    - vec2 -> x, y
    - vec3 -> x, y, z
    - vec4 -> x, y, z, w
    - notes: 1.0 is white and 0.0 is black
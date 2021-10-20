import { renderComponent } from '@glimmerx/core';
import { hbs } from '@glimmerx/component';
import { DEBUG } from '@glimmer/env';


let app = document.getElementById('app');

renderComponent(hbs`<div {{on "click" fn}}>example</div>`, {
  element: app
});

// this error should appear: (useless)

// constants.ts:192 Uncaught (in promise) TypeError: Invalid value used as weak map key
//     at WeakMap.set (<anonymous>)
//     at ConstantsImpl.modifier (constants.ts:192)
//     at resolveModifier (resolution.ts:205)
//     at encodeOp (encoder.ts:86)
//     at pushOp (compilable-template.ts:91)
//     at statements.ts:68
//     at Compilers.compile (compilers.ts:37)
//     at compileStatements (compilable-template.ts:95)
//     at maybeCompile (compilable-template.ts:71)
//     at CompilableTemplateImpl.compile (compilable-template.ts:44)
// modifier @ constants.ts:192
// resolveModifier @ resolution.ts:205
// encodeOp @ encoder.ts:86
// pushOp @ compilable-template.ts:91
// (anonymous) @ statements.ts:68
// compile @ compilers.ts:37
// compileStatements @ compilable-template.ts:95
// maybeCompile @ compilable-template.ts:71
// compile @ compilable-template.ts:44
// renderInvocation @ render.ts:106
// renderComponent @ render.ts:132
// getTemplateIterator @ index.ts:135
// renderComponent2 @ index.ts:67
// renderComponent @ renderComponent.js:9
// (anonymous) @ main.ts:5


// expected error: (meaningful)

// resolution.ts:200 Uncaught (in promise) Error: Attempted to resolve a modifier in a strict mode template, but it was not in scope: on
//     at resolveModifier (resolution.ts:200)
//     at encodeOp (encoder.ts:86)
//     at pushOp (compilable-template.ts:91)
//     at statements.ts:68
//     at Compilers.compile (compilers.ts:37)
//     at compileStatements (compilable-template.ts:95)
//     at maybeCompile (compilable-template.ts:71)
//     at CompilableTemplateImpl.compile (compilable-template.ts:44)
//     at renderInvocation (render.ts:106)
//     at renderComponent (render.ts:132)

// should be TRUE in console, because our babel plugins works just fine
console.log(DEBUG);
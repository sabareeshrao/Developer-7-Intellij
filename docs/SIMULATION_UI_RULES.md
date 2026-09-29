# Simulation UI Rules — Developer-7-Intellij

This downstream project must follow the pinned `Experiment-VS-Code` simulator contracts.

## Master runtime

Pinned source:
`sabareeshrao/Experiment-VS-Code@fdd89e9401432f5571b84bff3ba7d8bbf6c92a0f`

The pinned and current master versions of these core files were checked and matched at the time of this audit:

- `app.js`
- `simulator/intellij/engine.js`
- `simulator/intellij/ide-polish.css`
- `simulator/shared/highlighter.js`

## Code typing

If a lesson is teaching source code, completed code must not suddenly appear through a non-empty `createFile` action.

Required pattern:

```text
createFile with empty content
        ↓
typeCode with the real source
```

`typeCode` is the canonical master action because it:

- animates the current step;
- keeps the caret/code visible;
- follows the typed area;
- creates code-line focus;
- supports cumulative replay without reanimating historical steps.

## Terminal commands

Commands that the learner should watch must use `typeTerminal`.

Required terminal highlight target:

```text
.terminalCommandFocus
```

The master IntelliJ CSS gives that line a yellow command boundary.

Historical terminal commands replay silently. The current command types visibly when moving forward or replaying the current step.

## Highlight rules

- Clickable controls: shared thin blue target boundary.
- Code/text: explicit line highlight matched to the explanation.
- IntelliJ terminal command: yellow `.terminalCommandFocus` boundary.
- Giant full-screen highlight overlays are not allowed.
- A code explanation must not highlight only the editor tab or whole panel.
- Every step must have an explicit highlight contract or an intentional no-highlight marker.

## Explanation UI

The explanation card is master-owned/global.

The downstream repository must not create another explanation box.

Explanation text must:

- use compact `•` bullet lines;
- contain no empty paragraph gaps;
- explain reasons before technical vocabulary;
- assume zero prior knowledge when a term first appears;
- stay connected to the exact visible control, code, command, or result.

## Replay rules

- Set N continues the same project built by earlier sets.
- Historical actions replay silently.
- Only the current forward/replay step animates.
- Direct jump to a later step must reconstruct prior project state.
- Hard refresh must not be required.
- Blank/stale simulator states are not acceptable.
- Auto-typing must keep the current content visible rather than scrolling horizontally away from it.

## Downstream validation

`scripts/build-player-data.py` rejects:

- non-empty IntelliJ `createFile` source injection;
- code-edit actions without explicit code highlights;
- terminal typing without the yellow command-focus selector;
- missing actions/highlights/software;
- explanation lines without the bullet format;
- repeated explanation sentences.

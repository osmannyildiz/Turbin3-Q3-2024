/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/remixers.json`.
 */
export type Remixers = {
  "address": "4vm6E7yANSLWdBFuPTvafnXY6q8v6XKRzRYSYghGrJV1",
  "metadata": {
    "name": "remixers",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createMeme",
      "discriminator": [
        0,
        44,
        207,
        61,
        251,
        247,
        167,
        214
      ],
      "accounts": [
        {
          "name": "maker",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "customError",
      "msg": "Custom error message"
    }
  ],
  "constants": [
    {
      "name": "seed",
      "type": "string",
      "value": "\"anchor\""
    }
  ]
};

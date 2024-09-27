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
        },
        {
          "name": "meme",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "seed"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "seed",
          "type": "u32"
        },
        {
          "name": "imageUrl",
          "type": "string"
        }
      ]
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
    },
    {
      "name": "supportMeme",
      "discriminator": [
        70,
        247,
        186,
        183,
        110,
        140,
        89,
        115
      ],
      "accounts": [
        {
          "name": "supporter",
          "writable": true,
          "signer": true
        },
        {
          "name": "meme",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "memeSeed"
              }
            ]
          }
        },
        {
          "name": "supporterMemeData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  117,
                  112,
                  112,
                  111,
                  114,
                  116,
                  101,
                  114,
                  95,
                  109,
                  101,
                  109,
                  101,
                  95,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "supporter"
              },
              {
                "kind": "arg",
                "path": "memeSeed"
              }
            ]
          }
        },
        {
          "name": "maker",
          "writable": true
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "memeSeed",
          "type": "u32"
        },
        {
          "name": "lamports",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "meme",
      "discriminator": [
        232,
        224,
        0,
        147,
        187,
        194,
        135,
        26
      ]
    },
    {
      "name": "supporterMemeData",
      "discriminator": [
        75,
        45,
        227,
        146,
        188,
        195,
        60,
        54
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "customError",
      "msg": "Custom error message"
    }
  ],
  "types": [
    {
      "name": "meme",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "u32"
          },
          {
            "name": "maker",
            "type": "pubkey"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "remixOf",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "supportersCount",
            "type": "u16"
          },
          {
            "name": "totalRaisedLamports",
            "type": "u64"
          },
          {
            "name": "topSupporters",
            "type": {
              "array": [
                {
                  "option": {
                    "defined": {
                      "name": "topSupporter"
                    }
                  }
                },
                16
              ]
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "supporterMemeData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lamports",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "topSupporter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "supporter",
            "type": "pubkey"
          },
          {
            "name": "lamports",
            "type": "u64"
          }
        ]
      }
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

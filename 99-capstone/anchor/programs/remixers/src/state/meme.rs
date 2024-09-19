use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Meme {
    pub account_type: u8,
    pub seed: u32,
    pub maker: Pubkey,
    // pub remix_of: Option<Pubkey>,
    pub bump: u8,
}

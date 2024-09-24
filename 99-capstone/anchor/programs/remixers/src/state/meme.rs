use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Meme {
    pub seed: u32,

    pub maker: Pubkey,

    #[max_len(64)]
    pub image_url: String,

    // pub remix_of: Option<Pubkey>,

    pub bump: u8,
}

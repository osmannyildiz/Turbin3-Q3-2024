use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct TopSupporter {
    pub supporter: Pubkey,
    pub lamports: u64,
}

#[account]
#[derive(InitSpace)]
pub struct Meme {
    pub seed: u32,

    pub maker: Pubkey,

    #[max_len(64)]
    pub image_url: String,

    pub remix_of: Option<Pubkey>,

    pub supporters_count: u16,

    pub total_raised_lamports: u64,

    pub top_supporters: [Option<TopSupporter>; 16],

    pub bump: u8,
}

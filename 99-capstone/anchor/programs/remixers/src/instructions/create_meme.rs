use anchor_lang::prelude::*;

use crate::{Meme, TopSupporter};

#[derive(Accounts)]
#[instruction(seed: u32)]
pub struct CreateMeme<'info> {
    #[account(mut)]
    maker: Signer<'info>,

    #[account(
        init,
        payer = maker,
        space = 8 + Meme::INIT_SPACE,
        seeds = [b"meme", seed.to_le_bytes().as_ref()],
        bump
    )]
    meme: Account<'info, Meme>,

    system_program: Program<'info, System>,
}

impl<'info> CreateMeme<'info> {
    pub fn create_meme(
        &mut self,
        seed: u32,
        image_url: String,
        bumps: &CreateMemeBumps,
    ) -> Result<()> {
        const NONE: Option<TopSupporter> = None;
        self.meme.set_inner(Meme {
            seed,
            maker: self.maker.key(),
            image_url,
            remix_of: None,
            supporters_count: 0,
            total_raised_lamports: 0,
            top_supporters: [NONE; 16],
            bump: bumps.meme,
        });
        msg!("✅ Created a meme.");
        Ok(())
    }
}

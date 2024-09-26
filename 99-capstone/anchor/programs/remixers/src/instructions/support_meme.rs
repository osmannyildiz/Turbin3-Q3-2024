use anchor_lang::prelude::*;

use crate::{Meme, SupporterMemeData};

#[derive(Accounts)]
#[instruction(meme_seed: u32)]
pub struct SupportMeme<'info> {
    #[account(mut)]
    supporter: Signer<'info>,

    #[account(
        mut,
        seeds = [b"meme", meme_seed.to_le_bytes().as_ref()],
        bump = meme.bump,
    )]
    meme: Account<'info, Meme>,

    #[account(
        init_if_needed,
        payer = supporter,
        space = 8 + SupporterMemeData::INIT_SPACE,
        seeds = [b"supporter_meme_data", supporter.key().as_ref(), meme_seed.to_le_bytes().as_ref()],
        bump
    )]
    supporter_meme_data: Account<'info, SupporterMemeData>,

    system_program: Program<'info, System>,
}

impl<'info> SupportMeme<'info> {
    pub fn support_meme(
        &mut self,
        _meme_seed: u32,
        lamports: u64,
        bumps: &SupportMemeBumps,
    ) -> Result<()> {
        if self.supporter_meme_data.lamports > 0 {
            msg!("👉 Old supporter.");
            self.supporter_meme_data.lamports += lamports;
        } else {
            msg!("👉 New supporter.");
            self.supporter_meme_data.set_inner(SupporterMemeData {
                lamports,
                bump: bumps.supporter_meme_data,
            });
            self.meme.supporters_count += 1;
        }
        self.meme.total_raised_lamports += lamports;
        msg!("✅ Supported a meme.");
        Ok(())
    }
}

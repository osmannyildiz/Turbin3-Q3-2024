use anchor_lang::{
    prelude::*,
    system_program::{transfer, Transfer},
};

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

    #[account(
        mut,
        address = meme.maker
    )]
    maker: SystemAccount<'info>,

    #[account(
        mut,
        seeds = [b"vault"],
        bump
    )]
    vault: SystemAccount<'info>,

    system_program: Program<'info, System>,
}

impl<'info> SupportMeme<'info> {
    pub fn support_meme(
        &mut self,
        _meme_seed: u32,
        lamports: u64,
        bumps: &SupportMemeBumps,
    ) -> Result<()> {
        // Send SOL to the maker
        let program = self.system_program.to_account_info();
        let accounts = Transfer {
            from: self.supporter.to_account_info(),
            to: self.maker.to_account_info(),
        };
        let ctx = CpiContext::new(program, accounts);
        transfer(ctx, lamports / 2)?;

        // Send SOL to the platform's vault
        let program = self.system_program.to_account_info();
        let accounts = Transfer {
            from: self.supporter.to_account_info(),
            to: self.vault.to_account_info(),
        };
        let ctx = CpiContext::new(program, accounts);
        transfer(ctx, lamports / 2)?;

        // Update data
        if self.supporter_meme_data.lamports > 0 {
            msg!("👉 Old supporter.");
            self.supporter_meme_data.lamports += (lamports / 2) * 2;
        } else {
            msg!("👉 New supporter.");
            self.supporter_meme_data.set_inner(SupporterMemeData {
                lamports,
                bump: bumps.supporter_meme_data,
            });
            self.meme.supporters_count += 1;
        }
        self.meme.total_raised_lamports += (lamports / 2) * 2;

        msg!("✅ Supported a meme.");
        Ok(())
    }
}

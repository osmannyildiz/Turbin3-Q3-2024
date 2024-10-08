use anchor_lang::{
    prelude::*,
    system_program::{transfer, Transfer},
};

#[derive(Accounts)]
pub struct Init<'info> {
    #[account(mut)]
    house: Signer<'info>,

    #[account(
        // mut,
        seeds = [b"vault", house.key().as_ref()],
        bump
    )]
    vault: SystemAccount<'info>,

    system_program: Program<'info, System>,
}

impl<'info> Init<'info> {
    pub fn init(&mut self, amount: u64) -> Result<()> {
        let accounts = Transfer {
            from: self.house.to_account_info(),
            to: self.vault.to_account_info(),
        };
        let ctx = CpiContext::new(self.system_program.to_account_info(), accounts);
        transfer(ctx, amount)
    }
}

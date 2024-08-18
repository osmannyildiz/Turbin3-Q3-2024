use anchor_lang::prelude::*;

declare_id!("Nyp35wVRE4G8SyGJKPZg7e4QSqrWSwcGnrCdh8J9Qov");

#[program]
pub mod nft_staking {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

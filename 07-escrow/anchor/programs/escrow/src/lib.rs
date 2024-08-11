use anchor_lang::prelude::*;

declare_id!("F9tzHfxVjtU7nRTZ4v1JphpRK932kFdz5gbtZvmNsXyB");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

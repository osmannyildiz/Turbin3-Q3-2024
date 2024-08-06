use anchor_lang::prelude::*;

declare_id!("9cbay1PRQ36j647T1YeuXfjCpCBipT4hh3Y21PUP3jQt");

#[program]
pub mod vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

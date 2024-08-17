use anchor_lang::prelude::*;

declare_id!("DiGxbunBs6DojD9ns1J9vc8Z6YkYPYcocG2xAJpm4dnz");

#[program]
pub mod amm {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

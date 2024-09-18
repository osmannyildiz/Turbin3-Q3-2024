use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateMeme<'info> {
    #[account(mut)]
    maker: Signer<'info>,
}

impl<'info> CreateMeme<'info> {
    pub fn create_meme(&mut self) -> Result<()> {
        msg!("💃 {:?} wants to create a meme!", self.maker.key());
        Ok(())
    }
}

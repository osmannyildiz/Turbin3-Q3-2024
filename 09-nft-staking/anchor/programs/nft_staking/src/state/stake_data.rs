use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct StakeData {
    pub owner: Pubkey,
    pub mint: Pubkey,
    pub last_updated: i64,
    pub bump: u8,
}

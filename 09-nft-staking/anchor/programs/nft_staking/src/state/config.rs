use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Config {
    pub points_per_staked: u8,
    pub max_stakes: u8,
    pub freeze_period: u32,
    pub rewards_mint_bump: u8,
    pub bump: u8,
}

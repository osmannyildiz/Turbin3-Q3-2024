use anchor_lang::prelude::*;

pub mod contexts;
pub use contexts::*;

pub mod errors;
pub mod state;

declare_id!("Nyp35wVRE4G8SyGJKPZg7e4QSqrWSwcGnrCdh8J9Qov");

#[program]
pub mod nft_staking {
    use super::*;

    pub fn init(
        ctx: Context<Init>,
        points_per_stake: u8,
        max_stakes: u8,
        freeze_min_days: u16,
    ) -> Result<()> {
        ctx.accounts
            .init_config(points_per_stake, max_stakes, freeze_min_days, &ctx.bumps)
    }

    pub fn init_user(ctx: Context<InitUser>) -> Result<()> {
        ctx.accounts.init_user(&ctx.bumps)
    }

    pub fn stake(ctx: Context<Stake>) -> Result<()> {
        ctx.accounts.stake(&ctx.bumps)
    }

    pub fn unstake(ctx: Context<Unstake>) -> Result<()> {
        ctx.accounts.unstake()
    }

    pub fn claim(ctx: Context<Claim>) -> Result<()> {
        ctx.accounts.claim()
    }
}

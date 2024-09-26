use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct SupporterMemeData {
    pub lamports: u64,

    pub bump: u8,
}

use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("You have reached the maximum number of stakes.")]
    MaxStakesReached,
}

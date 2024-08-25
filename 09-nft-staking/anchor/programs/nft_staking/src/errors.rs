use anchor_lang::prelude::*;

#[error_code]
pub enum CustomErrorCode {
    #[msg("You have reached the maximum number of stakes.")]
    MaxStakesReached,

    #[msg("You haven't reached the minimum freeze period yet.")]
    FreezePeriodNotOver,

    // incorrect mint
    // incorrect collection
    // collection not verified
}

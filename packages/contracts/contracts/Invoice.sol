pragma solidity ^0.5.5;


contract Invoice {
    uint256 internal _dateOfSale;

    function get_date_of_sale() external view returns (uint256) {
        return _dateOfSale;
    }
}

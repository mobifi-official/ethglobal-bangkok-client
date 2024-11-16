// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

/**
 * @title ChainlinkResponseProcessor
 * @notice Example contract that processes responses from Chainlink Functions
 */
contract ChainlinkResponseProcessor {
    // State variables to store processed data
    bytes public lastProcessedData;
    string public lastDecodedString;
    uint256 public lastProcessedTimestamp;
    
    // Events
    event DataProcessed(bytes data, uint256 timestamp);
    event StringProcessed(string decodedString, uint256 timestamp);
    
    constructor() {}
    
    /**
     * @notice Processes the raw bytes response from Chainlink Functions
     * @param data The raw response data from Chainlink Functions
     */
    function targetMethod(bytes memory data) external {
        // Store the raw data
        lastProcessedData = data;
        lastProcessedTimestamp = block.timestamp;
        
        // Try to decode the bytes to string if that's what you're expecting
        // Note: This assumes the response is UTF-8 encoded string data
        try this.decodeToString(data) returns (string memory decoded) {
            lastDecodedString = decoded;
            emit StringProcessed(decoded, block.timestamp);
        } catch {
            // Handle case where data isn't a valid UTF-8 string
            lastDecodedString = "Decoding failed";
        }
        
        // Process the data according to your needs
        processData(data);
        
        emit DataProcessed(data, block.timestamp);
    }
    
    /**
     * @notice Attempts to decode bytes to string
     * @param data The bytes to decode
     * @return result The decoded string
     */
    function decodeToString(bytes memory data) public pure returns (string memory) {
        return string(data);
    }
    
    /**
     * @notice Internal function to process the data according to specific needs
     * @param data The data to process
     */
    function processData(bytes memory data) internal {
        // We can add our custom processing logic here
        // For example:
        // - Parse JSON data
        // - Extract specific values
        // - Update contract state
        // - Trigger other contract actions
        
        // This is where you'd implement your specific business logic
    }
    
    /**
     * @notice Retrieves the latest processed data and timestamp
     * @return data The last processed data
     * @return timestamp When the data was processed
     */
    function getLatestProcessedData() external view returns (bytes memory data, uint256 timestamp) {
        return (lastProcessedData, lastProcessedTimestamp);
    }
    
    /**
     * @notice Retrieves the latest decoded string and timestamp
     * @return decodedString The last decoded string
     * @return timestamp When the string was processed
     */
    function getLatestDecodedString() external view returns (string memory decodedString, uint256 timestamp) {
        return (lastDecodedString, lastProcessedTimestamp);
    }
}
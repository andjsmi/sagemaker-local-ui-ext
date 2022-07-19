import React, {useState} from 'react'
import Dropdown from './Dropdown'

const Menu: React.FC = (): JSX.Element => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [selectInstanceType, setInstanceType] = useState<string>("");
    const instanceTypes = () => {
        return ["p3.xlarge", "m5.xlarge"]
    }

    /**
     * Toggle the dropdown menu
     */
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    /**
     * Hide dropdown menu if user clicks elsewhere
     * 
     * @param event the mouse event
     */
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>) : void => {
        if (event.currentTarget === event.target) {
            setShowDropdown(false)
        }
    }

    function StartDockerHost(props: any) {

        const startButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>, instanceType: String) => {
            //console.log(event)
            {instanceType
                ? console.log("Creating instance with type ", instanceType)
                : console.log("Instance type has not been selected yet")
            }
            
          }

        return(
            <button onClick={event => startButtonClickHandler(event, props.instanceType)}>Create Host</button>
        )
    }

    /**
     * Callback function to get instance type from child component
     * 
     * @param instancetype The instance type
     */
    const instanceTypeSelection = (instancetype: string): void => {
        setInstanceType(instancetype)
    }



    return(
        <>
            <div className="announcement">
                <div>
                    {selectInstanceType
                        ? "You selected "+ selectInstanceType + " for your instance type"
                        : "Select the instance type"
                    }
                </div>
            </div>
            <button
                className={showDropdown ? "active" : undefined}
                onClick={(): void => toggleDropdown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
            >
                <div>{selectInstanceType ? "Select: " +  selectInstanceType : "Select ..."}</div>
                {showDropdown && (
                    <Dropdown
                        instancetypes={instanceTypes()}
                        showDropdown={false}
                        toggleDropdown={(): void => toggleDropdown()}
                        instanceTypeSelection={instanceTypeSelection}
                        />
                )}

            </button>
            <StartDockerHost instanceType={selectInstanceType} />
        </>
    )
}

export default Menu
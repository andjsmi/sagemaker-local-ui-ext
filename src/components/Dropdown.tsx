import React, { useEffect, useState} from 'react';

type DropdownProps = {
    instancetypes: string[];
    showDropdown: boolean;
    toggleDropdown: Function;
    instanceTypeSelection: Function;
}

const Dropdown: React.FC<DropdownProps> = ({ instancetypes, instanceTypeSelection}: DropdownProps): JSX.Element => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    /**
     * Handle passing the instance type back to parent component
     * 
     * @param instancetype The selected instance type
     */
    const onClickHandler = (instancetype: string): void => {
        instanceTypeSelection(instancetype)
    }

    useEffect(() => {
        setShowDropdown(showDropdown);
    }, [showDropdown])

    return (
        <>
            <div className={showDropdown ? 'dropdown' : 'dropdown active'}>
                {instancetypes.map(
                    (instancetype: string, index: number): JSX.Element => {
                        return(
                            <p key={index} onClick={(): void => {
                                onClickHandler(instancetype)
                    }}>
                        {instancetype}
                    </p>
                )
            }
                )}
            </div>

        </>
    )
}

export default Dropdown